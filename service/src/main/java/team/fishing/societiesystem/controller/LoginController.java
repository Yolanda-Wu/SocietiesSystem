package team.fishing.societiesystem.controller;


import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team.fishing.societiesystem.entity.User;
import team.fishing.societiesystem.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

import static jdk.nashorn.internal.runtime.regexp.joni.Config.log;

/**
 * @version V1.0
 * @Title: LoginController
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */



@RestController
@Slf4j
public class LoginController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "/login",method =  RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Map<String,Object> login(@RequestBody Map<String,Object> postMap, HttpServletRequest request){
        String telephoneNumber = postMap.get("telephone_number").toString();
        String userPassword = postMap.get("user_password").toString();
        String societyName = postMap.get("society_name").toString();
        Map<String,Object> map = new HashMap<>();

        User u = userService.findUserByTelephone(telephoneNumber);
        if(u == null || !userPassword.equals(u.getUserPassword())){
            map.put("user",u);
            map.put("status",401);
            map.put("err_msg","Unauthorized");
            log.info("登录失败");
            return map;
        }

        request.getSession().setAttribute("userInfo", telephoneNumber);


        Map<String,Integer> data = new HashMap<>();

        data.put("society_right",userService.findUserSocietyRightByUserIDAndSocietyName(u.getId(), societyName));
        data.put("system_right",u.getType());
        map.put("status",200);
        map.put("data",data);
        log.info("登录成功");



        return map;
    }



    @ResponseBody
    @RequestMapping(value = "/logout",produces = "application/json;charset=UTF-8")
    public Map<String,Object> loginOut(HttpServletRequest request){
        String info = "登出操作";
        log.info(info);
        HttpSession session = request.getSession();
        session.removeAttribute("userInfo");

        Map<String,Object> map = new HashMap<>();
        Map<String,Integer> data = new HashMap<>();


        Object userInfo = session.getAttribute("userInfo");
        if (userInfo == null) {
            info = "登出成功";
            map.put("status",200);
            map.put("data",data);

        } else {
            info = "登出失败";
            map.put("status",401);
            map.put("err_msg","Unauthorized");
        }
        log.info(info);
        return map;



    }


    @RequestMapping("/hello")
    public String index()  {
        //throw new Exception("发生错误");
        return "Hello World";
    }

}

