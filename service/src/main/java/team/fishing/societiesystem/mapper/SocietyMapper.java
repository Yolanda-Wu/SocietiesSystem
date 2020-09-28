package team.fishing.societiesystem.mapper;

import com.sun.corba.se.impl.ior.OldJIDLObjectKeyTemplate;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import team.fishing.societiesystem.entity.Society;
import team.fishing.societiesystem.entity.SocietyActivity;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @version V1.0
 * @Title: SocietyMapper
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */
@Mapper
@Repository
public interface SocietyMapper {

    @Insert("insert into society (name,contact,contact_info,email,attach,introduce,established_time,type) values (#{societyName},#{contact},#{contactInfo},#{email},#{attach},#{introduce},#{establishedTime},#{type})")
    Integer insertApplicationForm(String societyName,String contact,String contactInfo,String email,String attach ,String introduce,Long establishedTime,String type );

    @Select("select * from society where is_reviewed = 0")
    List<Society> getUnreviewedApplicationForm();

    @Select("select * from society where is_reviewed = 1 or is_reviewed = 2")
    List<Society> getReviewedApplicationForm();

    @Select("SELECT id,name,contact,contact_info,email,type,established_time,members,introduce FROM society where is_established = 1 ")
    List<Map<String,Object>> selectAllSocieties();

    @Select("select id,name,contact,type,established_time,members,introduce from society where id = #{id}")
    Map<String,Object> selectSocietyByID(Integer id);

    @Select("select * from society where id = #{id}")
    Society selectAllSocietyInfoByID(Integer id);

    @Select("select * from society where name = #{name}")
    Society selectSocietyByName(String name);


    @Select("select * from user_society where user_id = #{userID} and society_id = #{societyID}")
    Map<String,Object> selectUserSociety(Long userID,Long societyID);

    @Select("select user_id from user_society  where society_id = #{societyID} and user_right = 1")
    List<String> findSocietyAdminBySocietyID(Integer societyID);


    @Select("select * from society_activity where society_name = #{societyName} limit 10 offset #{offset}")
    List<SocietyActivity> selectSocietyActivityByPage(int offset,String societyName);

    @Select("select * from society_activity where activity_id = #{id}")
    SocietyActivity selectSocietyActivityByActivityID(Long id);

    @Select("select * from society_activity where society_name = #{societyName} limit 20 offset #{offset}")
    List<Map<String,Object>> selectSocietyActivityBySocietyName(String societyName,int offset);

    @Select("select id,name,telephone_number,email from user where id in (select user_id from user_activity where activity_id = #{activityID})")
    List<Map<String,Object>> selectSocietyActivityMemberInfo(Long activityID);

    @Select("Select count(*) from user_activity where user_id = #{userID} and activity_id = #{activityID}")
    Integer userInSocietyActivity(Long userID,Long activityID);


    @Update("update society set is_established = #{isEstablished},is_reviewed = #{isReviewed} where id = #{id}")
    Integer updateSocietyEstablishAndReviewState(Integer isEstablished,Integer isReviewed,Integer id);

    @Update("update user_society set user_society.user_right = 1 where society_id = #{societyID} and user_society.user_id in (select id from user where user.telephone_number = #{telephoneNumber})")
    Integer setSocietyAdminBySocietyIDAndTelephone(Long societyID,String telephoneNumber);

    @Update("update user_society set user_right = 0 where society_id = #{societyID}")
    Integer deletSocietyAdminBySocietyID(Long societyID);


    @Delete("delete from user_activity where user_id = #{userID} and activity_id = #{activityID}")
    Integer deleteUserActivity(Long userID,Long activityID);

    @Insert("insert into user_activity values(#{userID},#{activityID})")
    Integer insertUserActivity(Long userID,Long activityID);




    @Insert("insert into society_activity (society_id,society_name,start_time,end_time,title,description) values (#{societyID},#{societyName}, #{startTime},#{endTime}, #{title},#{description})")
    Integer insertSocietyActivity(Long societyID, String societyName, Long startTime,Long endTime,String title, String description);



    @Update("update society_activity set society_id = #{societyID},society_name = #{societyName},start_time = #{startTime},end_time = #{endTime},title = #{title},description = #{description} where activity_id = #{activityID}")
    Integer updateSocietyActivity(Long activityID, Long societyID, String societyName, Long startTime,Long endTime,String title, String description);

    @Update("update society set members = #{member} where id = #{id}")
    Integer updateSocietyMember(Integer member,Long id);

    @Delete("Delete from society_activity where activity_id = #{id}")
    Integer deleteSocietyActivityByActivityID(Long id);

    @Delete("delete from user_society where user_id = #{userID} and society_name = #{societyName}")
    Integer deleteSocietyMember(Long userID,String societyName);

    @Select("Select count(*) from user_society where society_id = #{id}")
    Integer countSocietyMemberBySocietyID(Long id);

    @Update("update society set contact = #{contact},contact_info = #{contactInfo} where id = #{societyID}")
    Integer updateSocietyContactInfo(String contact,String contactInfo,Long societyID);







}

