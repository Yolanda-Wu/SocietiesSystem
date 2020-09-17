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

    @Insert("insert into society (name,contact,contact_info,email,attach) values (#{societyName},#{contact},#{contactInfo},#{email},#{attach})")
    Integer insertApplicationForm(String societyName,String contact,String contactInfo,String email,String attach);

    @Select("SELECT id,name,contact,type,established_time,members,introduce FROM society")
    List<Map<String,Object>> selectAllSocieties();

    @Select("select id,name,contact,type,established_time,members,introduce from society where id = #{id}")
    Map<String,Object> selectSocietyByID(Integer id);

    @Select("select * from society where name = #{name}")
    Society selectSocietyByName(String name);

    @Select("select user_id from user_society  where society_id = #{societyID} and user_right = 1")
    List<String> findSocietyAdminBySocietyID(Integer societyID);


    @Select("select * from society_activity limit 10 offset #{offset}")
    List<SocietyActivity> selectSocietyActivityByPage(int offset);

    @Select("select * from society_activity where activity_id = #{id}")
    SocietyActivity selectSocietyActivityByActivityID(Long id);

    @Update("update user_society set user_society.user_right = 1 where user_society.user_id in (select id from user where user.telephone_number = #{telephoneNumber})")
    Integer setSocietyAdminByTelephone(String telephoneNumber);

    @Update("update user_society set user_right = 0 where society_name = #{societyName}")
    Integer deletSocietyAdminBySocietyName(String societyName);

    @Insert("insert into society_activity (society_id,society_name,start_time,end_time,title,description) values (#{societyID},#{societyName}, #{startTime},#{endTime}, #{title},#{description})")
    Integer insertSocietyActivity(Long societyID, String societyName, Date startTime,Date endTime,String title, String description);

    @Update("update society_activity set society_id = #{societyID},society_name = #{societyName},start_time = #{startTime},end_time = #{endTime},title = #{title},description = #{description} where activity_id = #{activityID}")
    Integer updateSocietyActivity(Long activityID, Long societyID, String societyName, Date startTime,Date endTime,String title, String description);


    @Delete("Delete from society_activity where activity_id = #{id}")
    Integer deleteSocietyActivityByActivityID(Long id);







}

