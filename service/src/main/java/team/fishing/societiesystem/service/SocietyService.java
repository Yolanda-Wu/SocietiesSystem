package team.fishing.societiesystem.service;

import team.fishing.societiesystem.entity.Society;
import team.fishing.societiesystem.entity.SocietyActivity;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @version V1.0
 * @Title: SocietyService
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */
public interface SocietyService {


    public Integer insertApplicationForm(String societyName,String contact,String contactInfo,String email,String attach ,String introduce,Long establishedTime,String type );



    public List<Society> getUnreviewedApplicationForm();

    public List<Society> getReviewedApplicationForm();


    public List<Map<String,Object>> selectAllSocieties();

    public Map<String,Object> selectSocietyByID(Integer societyID);

    public Society selectAllSocietyInfoByID(Integer id);

    public Integer userInSocietyActivity(Long userID,Long activityID);

    public List<String> findSocietyAdminBySocietyID(Integer societyID);

    public Society selectSocietyByName(String name);

    public List<Map<String,Object>> selectSocietyActivityBySocietyName(String societyName,int offset);

    public List<Map<String,Object>> selectSocietyActivityMemberInfo(Long activityID);

    public Integer setSocietyAdminBySocietyIDAndTelephone(Long societyID,String telephone);

    public Integer deletSocietyAdminBySocietyID(Long societyID);

    public Integer deleteSocietyActivityByActivityID(Long id);

    public Integer deleteSocietyMember(Long userID,String societyName);

    public Integer insertUserActivity(Long userID,Long activityID);

    public Integer deleteUserActivity(Long userID,Long activityID);


    public Integer updateSocietyEstablishAndReviewState(Integer isEstablished,Integer isReviewed,Integer id);

    public Integer updateSocietyActivity(Long activityID, Long societyID, String societyName, Long startTime,Long endTime,String title, String description);

    public Integer updateSocietyMember(Integer member,Long id);

    public Integer countSocietyMemberBySocietyID(Long id);

    public Integer insertSocietyActivity(Long societyID, String societyName, Long startTime, Long endTime, String title, String description);


    public List<SocietyActivity> selectSocietyActivityByPage(int offset,String societyName);

    public SocietyActivity selectSocietyActivityByActivityID(Long id);

    public Integer updateSocietyContactInfo(String contact,String contactInfo,Long societyID);



}

