package team.fishing.societiesystem.serviceimpl;

import com.sun.org.apache.bcel.internal.generic.RETURN;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.fishing.societiesystem.entity.Society;
import team.fishing.societiesystem.entity.SocietyActivity;
import team.fishing.societiesystem.mapper.SocietyMapper;
import team.fishing.societiesystem.mapper.UserMapper;
import team.fishing.societiesystem.service.SocietyService;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @version V1.0
 * @Title: SocietyServiceImpl
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */

@Service
public class SocietyServiceImpl implements SocietyService {
    @Autowired
    private SocietyMapper societyMapper;

    @Override
    public Integer insertApplicationForm(String societyName,String contact,String contactInfo,String email,String attach){
        return societyMapper.insertApplicationForm(societyName,contact,contactInfo,email,attach);
    }

    @Override
    public List<Map<String,Object>> selectAllSocieties(){
        return societyMapper.selectAllSocieties();
    }

    @Override
    public Map<String,Object> selectSocietyByID(Integer societyID){
        return societyMapper.selectSocietyByID(societyID);
    }

    @Override
    public List<String> findSocietyAdminBySocietyID(Integer societyID){
        return societyMapper.findSocietyAdminBySocietyID(societyID);
    }

    @Override
    public Society selectSocietyByName(String name){
        return societyMapper.selectSocietyByName(name);
    }


    @Override
    public Integer setSocietyAdminByTelephone(String telephone){
        return societyMapper.setSocietyAdminByTelephone(telephone);
    }

    @Override
    public Integer deletSocietyAdminBySocietyName(String societyName){
        return societyMapper.deletSocietyAdminBySocietyName(societyName);
    }


    @Override
    public Integer insertSocietyActivity(Long societyID, String societyName, Date startTime,Date endTime,String title, String description)
    {
        return societyMapper.insertSocietyActivity( societyID,  societyName,  startTime, endTime, title,  description);

    }

    @Override
    public Integer updateSocietyActivity(Long activityID, Long societyID, String societyName, Date startTime,Date endTime,String title, String description){
        return societyMapper.updateSocietyActivity(activityID,societyID,societyName,startTime,endTime,title,description);
    }


    @Override
    public Integer deleteSocietyActivityByActivityID(Long id){
        return societyMapper.deleteSocietyActivityByActivityID(id);
    }


    @Override
    public List<SocietyActivity> selectSocietyActivityByPage(int offset){

        return societyMapper.selectSocietyActivityByPage(offset);
    }

    @Override
    public SocietyActivity selectSocietyActivityByActivityID(Long id){
        return societyMapper.selectSocietyActivityByActivityID(id);
    }


}

