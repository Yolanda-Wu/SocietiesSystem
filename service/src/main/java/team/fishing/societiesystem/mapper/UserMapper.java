package team.fishing.societiesystem.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import team.fishing.societiesystem.entity.User;

/**
 * @version V1.0
 * @Title: UserMapper
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */
@Mapper
@Repository
public interface UserMapper {

    @Select("select * from user where telephone_number = #{telephoneNumber}")
    User findUserByTelephone(String telephoneNumber);

    @Select("select user_right from user_society where user_id = #{userID} and society_name = #{societyName}")
    Integer findUserSocietyRightByUserIDAndSocietyName(Long userID, String societyName);

    @Update("update user set user_password = #{password} where id = #{id}")
    Integer updateUserPasswordByID(Long id,String password);

    @Insert("insert into user (name,telephone_number) values (#{name},#{telephoneNumber})")
    Integer insertNewUser(String name,String telephoneNumber);

    @Insert("insert into user_society (user_id,society_id,user_right,society_name) values(#{userID},#{societyID},#{userRight},#{societyName})")
    Integer insertUserSocietyRight(Long userID,Long societyID,Integer userRight,String societyName);

    @Update("update user set name = #{name}, telephone_number = #{telephoneNumber} where id = #{id}")
    Integer updateUserInfo(String name,String telephoneNumber,Long id);

    @Update("update user_society set user_right = #{right} where user_id = #{userID} and society_name = #{societyName}")
    Integer updateUserSocietyRightByUserIdAndSocietyName(Long userID,String societyName,Integer right);

    @Delete("delete from user where id = #{id}")
    Integer deleteUser(Long id);




}

