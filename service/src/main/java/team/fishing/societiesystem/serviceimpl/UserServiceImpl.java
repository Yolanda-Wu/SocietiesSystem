package team.fishing.societiesystem.serviceimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.fishing.societiesystem.entity.User;
import team.fishing.societiesystem.mapper.UserMapper;
import team.fishing.societiesystem.service.UserService;

import java.net.Inet4Address;

/**
 * @version V1.0
 * @Title: UserServiceImpl
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User findUserByTelephone(String telephoneNumber){
        return userMapper.findUserByTelephone(telephoneNumber);
    }

    @Override
    public Integer findUserSocietyRightByUserIDAndSocietyName(Long userID, String societyName){
        return userMapper.findUserSocietyRightByUserIDAndSocietyName(userID,  societyName);
    }


    @Override
    public Integer updateUserPasswordByID(Long id, String password){
        return userMapper.updateUserPasswordByID(id,password);
    }


    @Override
    public Integer insertNewUser(String name,String telephone){
        return userMapper.insertNewUser(name,telephone);
    }

    @Override
    public Integer insertUserSocietyRight(Long userID,Long societyID,Integer userRight,String societyName){
        return userMapper.insertUserSocietyRight(userID,societyID,userRight,societyName);
    }
    @Override
    public Integer updateUserInfo(String name,String telephoneNumber,Long id){
        return userMapper.updateUserInfo(name,telephoneNumber,id);
    }

    @Override
    public Integer updateUserSocietyRightByUserIdAndSocietyName(Long userID,String societyName,Integer right){
        return  userMapper.updateUserSocietyRightByUserIdAndSocietyName(userID,societyName,right);
    }

    @Override
    public Integer deleteUser(Long id){
        return userMapper.deleteUser(id);
    }





}

