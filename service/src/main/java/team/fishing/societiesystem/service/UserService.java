package team.fishing.societiesystem.service;

import org.apache.ibatis.annotations.Param;
import team.fishing.societiesystem.entity.User;

/**
 * @version V1.0
 * @Title: UserService
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */
public interface UserService {

    public User findUserByTelephone(String telephoneNumber);

    public Integer findUserSocietyRightByUserIDAndSocietyName(Long userID, String societyName);

    public Integer updateUserPasswordByID(Long id,String password);

    public Integer insertNewUser(String name,String telephone);

    public Integer insertUserSocietyRight(Long userID,Long societyID,Integer userRight,String societyName);

    public Integer updateUserInfo(String name,String telephoneNumber,Long id);

    public Integer updateUserSocietyRightByUserIdAndSocietyName(Long userID,String societyName,Integer right);


    public Integer deleteUser(Long id);

}

