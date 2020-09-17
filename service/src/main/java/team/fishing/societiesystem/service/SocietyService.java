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


    public Integer insertApplicationForm(String societyName,String contact,String contactInfo,String email,String attach);


    public List<Map<String,Object>> selectAllSocieties();

    public Map<String,Object> selectSocietyByID(Integer societyID);

    public List<String> findSocietyAdminBySocietyID(Integer societyID);

    public Society selectSocietyByName(String name);


    public Integer setSocietyAdminByTelephone(String telephone);

    public Integer deletSocietyAdminBySocietyName(String societyName);

    public Integer deleteSocietyActivityByActivityID(Long id);

    public Integer updateSocietyActivity(Long activityID, Long societyID, String societyName, Date startTime,Date endTime,String title, String description);


    public Integer insertSocietyActivity(Long societyID, String societyName, Date startTime, Date endTime, String title, String description);


    public List<SocietyActivity> selectSocietyActivityByPage(int offset);

    public SocietyActivity selectSocietyActivityByActivityID(Long id);

}

