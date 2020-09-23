package team.fishing.societiesystem.controller;

import com.alibaba.fastjson.JSON;
import javafx.scene.chart.ScatterChart;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpRequest;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import team.fishing.societiesystem.entity.Society;
import team.fishing.societiesystem.entity.SocietyActivity;
import team.fishing.societiesystem.entity.User;
import team.fishing.societiesystem.service.SocietyService;
import team.fishing.societiesystem.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @version V1.0
 * @Title: SocietyController
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */
//@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
@RequestMapping("/api")
@Slf4j
public class SocietyController {
    @Autowired
    private SocietyService societyService;
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "/application/submit",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    public Map<String,Object> applicationProcess(@RequestBody Map<String,Object> postMap , HttpServletResponse response) {

        String societyName = postMap.get("society_name").toString();
        String contact = postMap.get("contact").toString();
        String contactInfo = postMap.get("contact_info").toString();
        String email = postMap.get("email").toString();
        String attach = postMap.get("attach").toString();
        String introduce = postMap.get("introduce").toString();
        Long establishTime = Long.parseLong(postMap.get("establish_time").toString());
        String type = postMap.get("type").toString();


        SimpleMailMessage msg = new SimpleMailMessage();
        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();



        try{
            societyService.insertApplicationForm(societyName,contact,contactInfo,email,attach,introduce,establishTime,type);


        }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
        }


        msg.setFrom("fishingpool@163.com");
        msg.setBcc();
        msg.setTo("fishingpool@163.com");
        msg.setSubject(societyName + " 社团申请说明 ");
        msg.setText("请及时处理该申请");
        try {
            javaMailSender.send(msg);
        } catch (MailException ex) {

            map.put("status",200);
            map.put("data",data);
            return map;
        }

        SimpleMailMessage feedback = new SimpleMailMessage();

        feedback.setFrom("fishingpool@163.com");
        feedback.setBcc();
        feedback.setTo(email);
        feedback.setSubject("社团申请回复");
        feedback.setText("您的申请已经收到，我们会尽快处理并给予答复");

        try {
            javaMailSender.send(feedback);
        } catch (MailException ex) {

            map.put("status",200);
            map.put("data",data);
            return map;
        }

        map.put("status",200);
        map.put("data",data);

        return map;

    }


    @ResponseBody
        @RequestMapping(value = "/admin/application/review",method = RequestMethod.GET,produces = "application/json;charset=UTF-8")
    public Map<String,Object> applicationGet(HttpServletRequest request, HttpServletResponse response) {

        Integer type = Integer.parseInt(request.getParameter("type"));
        Map<String,Object> map = new HashMap<>();

        HttpSession session=request.getSession();
        String telephoneAdmin;
        try{
            telephoneAdmin = session.getAttribute("userInfo").toString();
        }catch (NullPointerException e){
            response.setStatus(401);
            map.put("status",401);
            map.put("err_msg","Unauthorized");

            return map;
        }

        User admin = userService.findUserByTelephone(telephoneAdmin);
        if(admin.getType()==0){
            response.setStatus(403);
            map.put("status",403);
            map.put("err_msg","Forbidden");
            return map;
        }


        if(type == 1){
            try{
                map.put("data",societyService.getReviewedApplicationForm());
            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("status",200);
            return map;


        }else if(type == 2){
            try{
                map.put("data",societyService.getUnreviewedApplicationForm());

            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("status",200);
            return map;
        }

        response.setStatus(400);
        map.put("status",400);
        map.put("err_msg","Bad Request");
        return map;


    }


    @ResponseBody
    @RequestMapping(value = "/admin/application/review",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    public Map<String,Object> applicationReview(HttpServletRequest request,@RequestBody Map<String,Object> postMap, HttpServletResponse response) throws Exception{

        Integer id = Integer.parseInt(postMap.get("id").toString());
        Integer state = Integer.parseInt(postMap.get("state").toString());

        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();

        HttpSession session=request.getSession();
        String telephoneAdmin;
        try{
            telephoneAdmin = session.getAttribute("userInfo").toString();
        }catch (NullPointerException e){
            response.setStatus(401);
            map.put("status",401);
            map.put("err_msg","Unauthorized");

            return map;
        }
        log.info("system right : " + session.getAttribute("systemRight").toString());
        if(!session.getAttribute("systemRight").toString().equals("1")){
            response.setStatus(403);
            map.put("status",403);
            map.put("err_msg","Forbidden");
            return map;
        }
        /*
        User admin = userService.findUserByTelephone(telephoneAdmin);
        if(admin.getType()==0){
            response.setStatus(403);
            map.put("status",403);
            map.put("err_msg","Forbidden");
            return map;
        }

         */
        Society society = societyService.selectAllSocietyInfoByID(id);

        if(state == 1){
            String rejectReason = postMap.get("reject_reason").toString();
            try{
                societyService.updateSocietyEstablishAndReviewState(0,1,id);
            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            SimpleMailMessage feedback = new SimpleMailMessage();

            feedback.setFrom("fishingpool@163.com");
            feedback.setBcc();
            feedback.setTo(society.getEmail());
            feedback.setSubject(society.getName() + " 社团申请回复");
            feedback.setText("很抱歉，您的申请尚未通过。以下为申请失败的理由 \n"+rejectReason +" \n 欢迎您修改后再次投递");

            try {
                javaMailSender.send(feedback);
            } catch (MailException ex) {

                map.put("status",200);
                map.put("data",data);
                return map;
            }

            map.put("status",200);
            map.put("data",data);
            return map;


        }else if(state == 2){
            try{
                societyService.updateSocietyEstablishAndReviewState(1,2,id);
                User u = userService.findUserByTelephone(society.getContactInfo());
                if(userService.findUserByTelephone(society.getContactInfo()) == null){
                    userService.insertNewUser(society.getContact(),society.getContactInfo());
                    u = userService.findUserByTelephone(society.getContactInfo());
                    userService.insertUserSocietyRight(u.getId(),Long.valueOf(id),1,society.getName());
                }else{
                    userService.insertUserSocietyRight(u.getId(),Long.valueOf(id),1,society.getName());
                }

            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }

            SimpleMailMessage feedback = new SimpleMailMessage();

            feedback.setFrom("fishingpool@163.com");
            feedback.setBcc();
            feedback.setTo(society.getEmail());
            feedback.setSubject(society.getName() + " 申请回复");
            feedback.setText("您的申请已经通过，欢迎使用社团联盟系统！ \n 账号为您的联系方式，初始密码为 123456 \n 为保证账号安全请尽快更换密码哦:)");

            try {
                javaMailSender.send(feedback);
            } catch (MailException ex) {

                map.put("status",200);
                map.put("data",data);
                return map;
            }

            map.put("status",200);
            map.put("data",data);
            return map;

        }

        response.setStatus(400);
        map.put("status",400);
        map.put("err_msg","Bad Request");
        return map;


    }


    @ResponseBody
    @RequestMapping(value = "/league/society",method = RequestMethod.GET,produces = "application/json;charset=UTF-8")
    public Map<String,Object> getSocietyInfo(HttpServletRequest request , HttpServletResponse response) throws Exception{

        Integer type = Integer.parseInt(request.getParameter("type"));


        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();




        HttpSession session=request.getSession();
        log.info("sessionId in society 为：" + session.getId());
        String telephoneAdmin;
        try{
            telephoneAdmin = session.getAttribute("userInfo").toString();
        }catch (NullPointerException e){
            response.setStatus(401);
            map.put("status",401);
            map.put("err_msg","Unauthorized");

            return map;
        }


        User admin = userService.findUserByTelephone(telephoneAdmin);
        if(admin.getType()==0){
            response.setStatus(403);
            map.put("status",403);
            map.put("err_msg","Forbidden");
            return map;
        }

        if(type == 1){
            try{
                data.put("societies",societyService.selectAllSocieties());
            }catch (DataAccessException e){
                log.info("test");
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("type",type);
            map.put("status",200);
            map.put("data",data);

            return map;

        }else if(type == 2){
            try{
                Integer id = Integer.parseInt(request.getParameter("id"));
                Map<String,Object> society = societyService.selectSocietyByID(id);
                if(society == null){
                    response.setStatus(404);
                    map.put("type",type);
                    map.put("status",404);
                    map.put("err_msg","Not Found");
                    return map;
                }

                society.put("admins",societyService.findSocietyAdminBySocietyID(id));
                data.put("societies",society);

            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("type",type);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("type",type);
            map.put("status",200);
            map.put("data",data);
            //response.getWriter().write(JSON.toJSONString(map));
            return map;

        }
        response.setStatus(400);
        map.put("type",type);
        map.put("status",400);
        map.put("err_msg","Bad Request");
        return map;

    }



    @ResponseBody
    @RequestMapping(value = "/league/admin",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    public Map<String,Object> changeSocietyAdmin(@RequestBody Map<String,Object> postMap ,HttpServletRequest request ,HttpServletResponse response){

        String societyName = postMap.get("society_name").toString();
        String contact = postMap.get("contact").toString();
        String contactInfo = postMap.get("contact_info").toString();
        Long societyID = Long.parseLong(postMap.get("id").toString());

        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();


        String telephoneAdmin;
        try{

            telephoneAdmin = request.getSession().getAttribute("userInfo").toString();

        }catch (NullPointerException e){
            response.setStatus(401);
            map.put("status",401);
            map.put("err_msg","Unauthorized");

            return map;
        }


        User admin = userService.findUserByTelephone(telephoneAdmin);
        if(admin.getType()==0){
            response.setStatus(403);
            map.put("status",403);
            map.put("err_msg","Forbidden");
            return map;
        }




        try {
            //societyService.deletSocietyAdminBySocietyID(societyID);
            if(userService.findUserByTelephone(contactInfo) != null){
                User u = userService.findUserByTelephone(contactInfo);
                if(societyService.setSocietyAdminBySocietyIDAndTelephone(societyID,contactInfo) <= 0 && societyService.selectUserSociety(u.getId(),societyID) == null) {


                    userService.insertUserSocietyRight(u.getId(),societyID,1,societyName);
                }
                userService.updateUserInfo(contact,contactInfo,u.getId());


            }else{
                userService.insertNewUser(contact,contactInfo);
                User u = userService.findUserByTelephone(contactInfo);
                userService.insertUserSocietyRight(u.getId(),societyID,1,societyName);
            }

            societyService.updateSocietyContactInfo(contact,contactInfo,societyID);



        }catch (DataAccessException e){
            response.setStatus(500);
            map.put("status",500);
            map.put("err_msg","Internal Server Error");
            return map;
        }

        map.put("status",200);
        map.put("data",data);
        return map;


    }



    @ResponseBody
    @RequestMapping(value = "/admin/{society_name}/activity" ,method =  RequestMethod.POST)
    public Map<String,Object> societyActivityManage(@PathVariable(name = "society_name") String societyName,@RequestBody Map<String,Object> postMap ,HttpServletRequest request ,HttpServletResponse response) {


        Integer type = Integer.parseInt(postMap.get("type").toString());

        Long startTimel =  Long.parseLong(postMap.get("start_time").toString());
        Long endTimel =  Long.parseLong(postMap.get("end_time").toString());



        String title = postMap.get("title").toString();
        String description = postMap.get("description").toString();

        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();


        String telephoneAdmin;
        try{
            telephoneAdmin = request.getSession().getAttribute("userInfo").toString();
        }catch (NullPointerException e){
            response.setStatus(401);
            map.put("status",401);
            map.put("err_msg","Unauthorized");

            return map;
        }
        User admin = userService.findUserByTelephone(telephoneAdmin);
        Integer adminRight = userService.findUserSocietyRightByUserIDAndSocietyName(admin.getId(),societyName);

        if(adminRight ==  null || adminRight == 0){
            response.setStatus(403);
            map.put("status",403);
            map.put("err_msg","Forbidden");
            return map;
        }

        Society society = societyService.selectSocietyByName(societyName);
        if(society == null){
            response.setStatus(404);
            map.put("status",404);
            map.put("err_msg","Not Found");
            return map;
        }
        Long id = society.getId();


        if(type == 1){
            try {
                societyService.insertSocietyActivity(id,societyName,startTimel,endTimel,title,description);

            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;
        }
        else if(type == 2){
            try {
                Long activityId=Long.parseLong( postMap.get("activity_id").toString());

                societyService.updateSocietyActivity(activityId,id,societyName,startTimel,endTimel,title,description);

            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;
        }else if(type == 3){
            try {
                Long activityId=Long.parseLong( postMap.get("activity_id").toString());
                societyService.deleteSocietyActivityByActivityID(activityId);
            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;

        }
        response.setStatus(400);
        map.put("status",400);
        map.put("err_msg","Bad Request");
        return map;
    }




    @ResponseBody
    @RequestMapping(value = "/admin/{society_name}/activity",method = RequestMethod.GET)
    public Map<String,Object> getSocietyActivityMember(@PathVariable(name = "society_name") String societyName,HttpServletRequest request ,HttpServletResponse response) {
        Integer type = Integer.parseInt(request.getParameter("type"));
        Integer page = Integer.parseInt(request.getParameter("page"));
        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();


        String telephoneAdmin;
        try{
            telephoneAdmin = request.getSession().getAttribute("userInfo").toString();
        }catch (NullPointerException e){
            response.setStatus(401);
            map.put("status",401);
            map.put("err_msg","Unauthorized");
            return map;
        }

        if(type == 1){
            User admin = userService.findUserByTelephone(telephoneAdmin);
            Integer adminRight = userService.findUserSocietyRightByUserIDAndSocietyName(admin.getId(),societyName);

            if(adminRight ==  null || adminRight == 0){
                response.setStatus(403);
                map.put("status",403);
                map.put("err_msg","Forbidden");
                return map;
            }

            try {
                List<Map<String,Object>> activities = societyService.selectSocietyActivityBySocietyName(societyName,20*(page-1));
                for(Map<String,Object> activity : activities){
                    activity.put("participants",societyService.selectSocietyActivityMemberInfo(Long.parseLong(activity.get("activity_id").toString())));
                }
                data.put("activities",activities);
            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }

            map.put("status",200);
            map.put("data",data);
            return map;

        }else if(type == 2){
            try{

                List<Map<String,Object>> activities = societyService.selectSocietyActivityBySocietyName(societyName,20*(page-1));
                for(Map<String,Object> activity : activities) {
                    activity.put("participants", societyService.selectSocietyActivityMemberInfo(Long.parseLong(activity.get("activity_id").toString())));
                    Long userID = Long.parseLong(request.getSession().getAttribute("userID").toString());
                    Long activityID = Long.parseLong(activity.get("activity_id").toString());
                    if (societyService.userInSocietyActivity(userID, activityID) > 0) {
                        activity.put("is_join", 1);
                    } else {
                        activity.put("is_join", 0);
                    }
                }
                data.put("activities",activities);
            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;

        }

        response.setStatus(400);
        map.put("status",400);
        map.put("err_msg","Bad Request");
        return map;

    }

    @ResponseBody
    @RequestMapping(value = "/admin/{society_name}/activity/join",method = RequestMethod.POST)
    public Map<String,Object> activityMemberManage(@PathVariable(name = "society_name") String societyName,HttpServletRequest request ,HttpServletResponse response ,@RequestBody Map<String,Object> postMap) {
        Long activityID = Long.parseLong(postMap.get("activity_id").toString());
        Integer isJoin = Integer.parseInt(postMap.get("is_join").toString());

        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();


        String telephoneAdmin;
        Long userID;
        try{
            telephoneAdmin = request.getSession().getAttribute("userInfo").toString();
            userID = Long.parseLong(request.getSession().getAttribute("userID").toString());
        }catch (NullPointerException e){
            response.setStatus(401);
            map.put("status",401);
            map.put("err_msg","Unauthorized");
            return map;
        }

        if(isJoin == 0){
            try {
                societyService.deleteUserActivity(userID,activityID);

            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;

        }else if(isJoin == 1){
            try {

                if(societyService.userInSocietyActivity(userID,activityID)<= 0){
                    societyService.insertUserActivity(userID,activityID);
                }
            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;


        }
        response.setStatus(400);
        map.put("status",400);
        map.put("err_msg","Bad Request");
        return map;

    }


    @ResponseBody
    @RequestMapping(value = "/society/{society_name}/activity")
    public Map<String,Object> getSocietyActivityInfo(@PathVariable(name = "society_name") String societyName, HttpServletRequest request ,HttpServletResponse response)  {


        Integer type = Integer.parseInt(request.getParameter("type"));
        Integer page = Integer.parseInt(request.getParameter("page"));


        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();



        if(type == 1){
            try{
                data.put("activities",societyService.selectSocietyActivityByPage((page-1)*10,societyName));

            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;

        }else if(type == 2){
            try{
                Long activityID = Long.parseLong(request.getParameter("activity_id"));
                SocietyActivity societyActivity = societyService.selectSocietyActivityByActivityID(activityID);
                if(societyActivity == null){
                    response.setStatus(404);
                    map.put("status",404);
                    map.put("err_msg","Not Found");
                    return map;
                }
                data.put("activities",societyActivity);

            }catch (DataAccessException e){
                response.setStatus(500);
                map.put("status",500);
                map.put("err_msg","Internal Server Error");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;

        }

        response.setStatus(400);
        map.put("status",400);
        map.put("err_msg","Bad Request");
        return map;


    }


    @ResponseBody
    @RequestMapping(value = "/society/{society_name}/info")
    public Map<String,Object> getSocietyInfo(@PathVariable(name = "society_name" ) String societyName ,HttpServletResponse response) {




        Map<String,Object> map = new HashMap<>();

        try {
            Society society = societyService.selectSocietyByName(societyName);
            if(society == null){
                response.setStatus(404);
                map.put("status",404);
                map.put("err_msg","Not Found");
                return map;
            }
            map.put("data",society);

        }catch (DataAccessException e){
            response.setStatus(500);
            map.put("status",500);
            map.put("err_msg","Internal Server Error");
            return map;
        }
        map.put("status",200);
        return map;

    }


    @ResponseBody
    @RequestMapping(value = "/society/{society_name}/feedback")//,produces = "application/json;charset=UTF-8")
    public Map<String,Object> societyFeedback(@PathVariable(name = "society_name") String societyName,@RequestBody Map<String,Object> postMap ,HttpServletResponse response)  {


        String name = postMap.get("name").toString();

        String title = postMap.get("title").toString();
        String content = postMap.get("content").toString();
        String telephone = postMap.get("telephone").toString();

        Society society = societyService.selectSocietyByName(societyName);

        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();


        SimpleMailMessage feedback = new SimpleMailMessage();

        feedback.setFrom("fishingpool@163.com");
        feedback.setBcc();
        feedback.setTo(society.getEmail());
        feedback.setSubject(title);
        feedback.setText(content + "\n反馈人： " + name + "\n联系方式： " + telephone);

        try {
            javaMailSender.send(feedback);

        } catch (MailException ex) {
            response.setStatus(500);
            map.put("status",500);
            map.put("err_msg","Internal Server Error");
            return map;

        }
        map.put("status",200);
        map.put("data",data);
        return map;



    }



}

