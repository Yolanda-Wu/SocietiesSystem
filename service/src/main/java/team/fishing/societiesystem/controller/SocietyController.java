package team.fishing.societiesystem.controller;

import javafx.scene.chart.ScatterChart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import team.fishing.societiesystem.entity.Society;
import team.fishing.societiesystem.entity.SocietyActivity;
import team.fishing.societiesystem.service.SocietyService;

import javax.servlet.http.HttpServletRequest;
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

@RestController
public class SocietyController {
    @Autowired
    private SocietyService societyService;
    @Autowired
    private JavaMailSender javaMailSender;

    @ResponseBody
    @RequestMapping(value = "/application/submit",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    public Map<String,Object> applicationProcess(@RequestBody Map<String,Object> postMap){

        String societyName = postMap.get("society_name").toString();
        String contact = postMap.get("contacts").toString();
        String contactInfo = postMap.get("contact_info").toString();
        String email = postMap.get("email").toString();
        String attach = postMap.get("attach").toString();


        SimpleMailMessage msg = new SimpleMailMessage();
        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();

        try{
            societyService.insertApplicationForm(societyName,contact,contactInfo,email,attach);

        }catch (DataAccessException e){
                map.put("status",401);
                map.put("err_msg","已存在该社团");
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

            map.put("status",401);
            map.put("err_msg","Unanthorized");
            return map;
        }

        SimpleMailMessage feedback = new SimpleMailMessage();

        feedback.setFrom("fishingpool@163.com");
        feedback.setBcc();
        feedback.setTo(email);
        feedback.setSubject("社团申请回复");
        feedback.setText("您的申请我们已经收到，我们会尽快处理并给予答复");

        try {
            javaMailSender.send(feedback);
        } catch (MailException ex) {

            map.put("status",200);
            map.put("err_msg",data);
            return map;
        }

        map.put("status",200);
        map.put("data",data);

        return map;

    }

    @ResponseBody
    @RequestMapping(value = "/league/society",method = RequestMethod.GET,produces = "application/json;charset=UTF-8")
    public Map<String,Object> getSocietyInfo(HttpServletRequest request){

        Integer type = Integer.parseInt(request.getParameter("type"));
        Integer id = Integer.parseInt(request.getParameter("id"));
        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();

        if(type == 1){
            try{
                data.put("societies",societyService.selectAllSocieties());
            }catch (DataAccessException e){
                map.put("status",401);
                map.put("err_msg","Unanthorized");
                return map;
            }

            map.put("status",200);
            map.put("data",data);
            return map;
        }else if(type == 2){
            try{
                Map<String,Object> society = societyService.selectSocietyByID(id);
                if(society == null){
                    map.put("status",401);
                    map.put("err_msg","Unanthorized");
                    return map;
                }

                society.put("admins",societyService.findSocietyAdminBySocietyID(id));
                data.put("societies",society);
            }catch (DataAccessException e){
                map.put("status",401);
                map.put("err_msg","Unanthorized");
                return map;
            }

            map.put("status",200);
            map.put("data",data);
            return map;

        }

        map.put("status",401);
        map.put("err_msg","Unanthorized");
        return map;

    }



    @ResponseBody
    @RequestMapping(value = "/league/admin",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    public Map<String,Object> changeSocietyAdmin(@RequestBody Map<String,Object> postMap){

        String societyName = postMap.get("society_name").toString();
        String contact = postMap.get("contact").toString();
        String contactInfo = postMap.get("contact_info").toString();

        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();

        try {
            societyService.deletSocietyAdminBySocietyName(societyName);
            societyService.setSocietyAdminByTelephone(contactInfo);
        }catch (DataAccessException e){
            map.put("status",401);
            map.put("err_msg","Unanthorized");
            return map;
        }

        map.put("status",200);
        map.put("data",data);
        return map;


    }



    @ResponseBody
    @RequestMapping(value = "/admin/{society_name}/activity")//,produces = "application/json;charset=UTF-8")
    public Map<String,Object> societyActivityManage(@PathVariable(name = "society_name") String societyName,@RequestBody Map<String,Object> postMap) throws ParseException {


        Integer type = Integer.parseInt(postMap.get("type").toString());
        Long activityId =Long.parseLong( postMap.get("activity_id").toString());
        SimpleDateFormat df = new SimpleDateFormat("yyyy-mm-dd");

        Date startTime =  df.parse(postMap.get("start_time").toString());
        Date endTime = df.parse(postMap.get("end_time").toString());
        String title = postMap.get("title").toString();
        String description = postMap.get("description").toString();

        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();

        Society society = societyService.selectSocietyByName(societyName);
        Long id = society.getId();


        if(type == 1){
            try {
                societyService.insertSocietyActivity(id,societyName,startTime,endTime,title,description);

            }catch (DataAccessException e){
                map.put("status",401);
                map.put("err_msg","Unanthorized");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;
        }
        else if(type == 2){
            try {

                societyService.updateSocietyActivity(activityId,id,societyName,startTime,endTime,title,description);

            }catch (DataAccessException e){
                map.put("status",401);
                map.put("err_msg","Unanthorized");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;
        }else if(type == 3){
            try {
                societyService.deleteSocietyActivityByActivityID(activityId);
            }catch (DataAccessException e){
                map.put("status",401);
                map.put("err_msg","Unanthorized");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;

        }




        map.put("status",401);
        map.put("err_msg","Unanthorized");
        return map;


    }





    @ResponseBody
    @RequestMapping(value = "/society/{society_name}/activity")
    public Map<String,Object> getSocietyActivityInfo(@PathVariable(name = "society_name") String societyName, @RequestBody Map<String,Object> postMap)  {


        Integer type = Integer.parseInt(postMap.get("type").toString());
        Integer page = Integer.parseInt(postMap.get("page").toString());
        Long activityID = Long.parseLong(postMap.get("activity_id").toString());

        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();


        if(type == 1){
            try{
                data.put("activities",societyService.selectSocietyActivityByPage((page-1)*10));

            }catch (DataAccessException e){
                map.put("status",401);
                map.put("err_msg","Unanthorized");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;

        }else if(type == 2){
            try{
                data.put("activities",societyService.selectSocietyActivityByActivityID(activityID));

            }catch (DataAccessException e){
                map.put("status",401);
                map.put("err_msg","Unanthorized");
                return map;
            }
            map.put("status",200);
            map.put("data",data);
            return map;

        }




        map.put("status",401);
        map.put("err_msg","Unanthorized");
        return map;


    }


    @ResponseBody
    @RequestMapping(value = "/society/{society_name}/info")//,produces = "application/json;charset=UTF-8")
    public Map<String,Object> getSocietyInfo(@PathVariable(name = "society_name") String societyName) {




        Map<String,Object> map = new HashMap<>();

        try {

            map.put("data",societyService.selectSocietyByName(societyName));

        }catch (DataAccessException e){
            map.put("status",401);
            map.put("err_msg","Unanthorized");
            return map;
        }
        map.put("status",200);
        return map;

    }


    @ResponseBody
    @RequestMapping(value = "/society/{society_name}/feedback")//,produces = "application/json;charset=UTF-8")
    public Map<String,Object> societyFeedback(@PathVariable(name = "society_name") String societyName,@RequestBody Map<String,Object> postMap)  {


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
            map.put("status",401);
            map.put("err_msg","Unanthorized");
            return map;

        }
        map.put("status",200);
        map.put("data",data);
        return map;



    }



}

