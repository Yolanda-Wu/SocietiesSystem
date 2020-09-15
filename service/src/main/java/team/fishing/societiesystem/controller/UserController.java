package team.fishing.societiesystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.*;
import team.fishing.societiesystem.entity.Society;
import team.fishing.societiesystem.entity.User;
import team.fishing.societiesystem.service.SocietyService;
import team.fishing.societiesystem.service.UserService;

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


@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SocietyService societyService;


    @ResponseBody
    @RequestMapping(value = "/password",method =  RequestMethod.POST , produces = "application/json;charset=UTF-8")
    public Map<String,Object> changePassword(@RequestBody Map<String,Object> postMap){
        String telephoneNumber = postMap.get("telephone_number").toString();
        String newPassword = postMap.get("new_password").toString();
        String oldPassword = postMap.get("old_password").toString();

        Map<String,Object> map = new HashMap<>();

        User u = userService.findUserByTelephone(telephoneNumber);
        if(u == null || !oldPassword.equals(u.getUserPassword())){
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

        map.put("status",401);
        map.put("err_msg","Unauthorized");


        return map;
    }


    @ResponseBody
    @RequestMapping(value = "/admin/{society_name}/member")//,produces = "application/json;charset=UTF-8")
    public Map<String,Object> societyMemberManage(@PathVariable(name = "society_name") String societyName,@RequestBody Map<String,Object> postMap)  {


        Integer type = Integer.parseInt(postMap.get("type").toString());
        Long userID =Long.parseLong( postMap.get("user_id").toString());
        Integer userRight = Integer.parseInt(postMap.get("user_right").toString());
        String telephone = postMap.get("telephone").toString();
        String name = postMap.get("name").toString();

        Map<String,Object> map = new HashMap<>();
        Map<String,Object> data = new HashMap<>();

        Society society = societyService.selectSocietyByName(societyName);





        if(type == 1){
            try {
                userService.insertNewUser(name,telephone);

                User u = userService.findUserByTelephone(telephone);
                userService.insertUserSocietyRight(u.getId(),society.getId(),userRight,societyName);

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
                userService.updateUserInfo(name,telephone,userID);
                userService.updateUserSocietyRightByUserIdAndSocietyName(userID,societyName,userRight);

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
                userService.deleteUser(userID);
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

}

