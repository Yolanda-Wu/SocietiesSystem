package team.fishing.societiesystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.*;
import team.fishing.societiesystem.entity.Society;
import team.fishing.societiesystem.entity.User;
import team.fishing.societiesystem.service.SocietyService;
import team.fishing.societiesystem.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * @version V1.0
 * @Title: UserController
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */

//@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SocietyService societyService;


    @ResponseBody
    @RequestMapping(value = "/password",method =  RequestMethod.POST , produces = "application/json;charset=UTF-8")
    public Map<String,Object> changePassword(@RequestBody Map<String,Object> postMap , HttpServletResponse response){
        String telephoneNumber = postMap.get("telephone_number").toString();
        String newPassword = postMap.get("new_password").toString();
        String oldPassword = postMap.get("old_password").toString();

        Map<String,Object> map = new HashMap<>();


        User u = userService.findUserByTelephone(telephoneNumber);
        if(u == null || !oldPassword.equals(u.getUserPassword())){
            response.setStatus(401);
            map.put("status",401);
            map.put("err_msg","Unauthorized");
            return map;
        }

        Map<String,Integer> data = new HashMap<>();


        if(userService.updateUserPasswordByID(u.getId(), newPassword) >0){

            data.put("system_right",u.getType());
            map.put("status",200);
            map.put("data",data);
            return map;
        }
        response.setStatus(401);
        map.put("status",401);
        map.put("err_msg","Unauthorized");


        return map;
    }


    @ResponseBody
    @RequestMapping(value = "/admin/{society_name}/member" ,method =  RequestMethod.POST)
    public Map<String,Object> societyMemberManage(@PathVariable(name = "society_name") String societyName, @RequestBody Map<String,Object> postMap , HttpServletRequest request , HttpServletResponse response)  {


        Integer type = Integer.parseInt(postMap.get("type").toString());
        Integer userRight = Integer.parseInt(postMap.get("user_right").toString());
        String telephone = postMap.get("telephone").toString();
        String name = postMap.get("name").toString();

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



        if(adminRight ==  0){
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

        if(type == 1){
            if(userService.findUserByTelephone(telephone) == null){
                userService.insertNewUser(name,telephone);

            }

            try {
                User u = userService.findUserByTelephone(telephone);
                userService.insertUserSocietyRight(u.getId(),society.getId(),userRight,societyName);
                Integer member = societyService.countSocietyMemberBySocietyID(society.getId());
                societyService.updateSocietyMember(
                        member
                        ,society.getId());


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
                Long userID =Long.parseLong( postMap.get("user_id").toString());
                userService.updateUserInfo(name,telephone,userID);
                userService.updateUserSocietyRightByUserIdAndSocietyName(userID,societyName,userRight);


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
                Long userID =Long.parseLong( postMap.get("user_id").toString());
                societyService.deleteSocietyMember(userID,societyName);
                Integer member = societyService.countSocietyMemberBySocietyID(society.getId());
                societyService.updateSocietyMember(
                        member
                        ,society.getId());
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
    @RequestMapping(value = "/admin/{society_name}/member" ,method =  RequestMethod.GET)
    public Map<String,Object> getSocietyMemberInfo(@PathVariable(name = "society_name") String societyName,  HttpServletRequest request , HttpServletResponse response)  {

        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();
        //String telephoneAdmin = request.getSession().getAttribute("userInfo").toString();
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



        if(adminRight !=  1){
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



        try {
            data.put("data",userService.selectSocietyMember(societyName));
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





}

