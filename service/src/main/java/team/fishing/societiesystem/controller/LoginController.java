package team.fishing.societiesystem.controller;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import team.fishing.societiesystem.entity.User;
import team.fishing.societiesystem.service.UserService;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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


//@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
@RequestMapping("/api")
@Slf4j
public class LoginController {

    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "/login",method =  RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Map<String,Object> login(@RequestBody Map<String,Object> postMap, HttpServletRequest request , HttpServletResponse response) throws Exception{
        String telephoneNumber = postMap.get("telephone_number").toString();
        String userPassword = postMap.get("user_password").toString();
        String societyName;
        try{
             societyName = postMap.get("society_name").toString();
        }catch (NullPointerException e){
             societyName = "";
        }

        Map<String,Object> map = new HashMap<>();

        User u = userService.findUserByTelephone(telephoneNumber);
        if(u == null){
            response.setStatus(404);
            map.put("status",404);
            map.put("err_msg","Not Found");
            log.info("用户不存在");
            return map;
        }
        if(!userPassword.equals(u.getUserPassword())){
            response.setStatus(401);
            map.put("status",401);
            map.put("err_msg","Unauthorized");
            log.info("登录失败");
            return map;
        }

        request.getSession().setAttribute("userInfo", telephoneNumber);
        request.getSession().setAttribute("systemRight", u.getType());
        request.getSession().setAttribute("userID", u.getId());


        Cookie cookie = new Cookie("JSESSIONID", request.getSession().getId());
        cookie.setPath(request.getContextPath());
        response.addCookie(cookie);

        Map<String,Integer> data = new HashMap<>();

        if(societyName != ""){
            data.put("society_right",userService.findUserSocietyRightByUserIDAndSocietyName(u.getId(), societyName));

        }
        data.put("system_right",u.getType());
        map.put("status",200);
        map.put("data",data);
        log.info("登录成功");
        log.info("sessionId为：" + request.getSession().getId());



        return map;
    }



    @ResponseBody
    @RequestMapping(value = "/logout",produces = "application/json;charset=UTF-8")
    public Map<String,Object> loginOut(HttpServletRequest request ,HttpServletResponse response){
        String info = "登出操作";
        log.info(info);
        HttpSession session = request.getSession();
        session.removeAttribute("userInfo");

        Map<String,Object> map = new HashMap<>();
        Map<String,Integer> data = new HashMap<>();


        Object userInfo = session.getAttribute("userInfo");
        if (userInfo == null) {
            info = "登出成功";
            response.setStatus(200);
            map.put("status",200);
            map.put("data",data);

        } else {
            info = "登出失败";
            response.setStatus(401);
            map.put("status",401);
            map.put("err_msg","Unauthorized");
        }
        log.info(info);
        return map;

    }


    @RequestMapping("/hello")
    public void index(HttpServletResponse response)  throws Exception{
        //throw new Exception("发生错误");
        Map<String,Object> map = new HashMap<>();


        User u = userService.findUserByTelephone("233");
        map.put("status",200);
        map.put("data",u);
        response.getWriter().write(JSON.toJSONString(map));
        //return "Hello World";
    }

}

