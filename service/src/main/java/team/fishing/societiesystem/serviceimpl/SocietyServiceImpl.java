package team.fishing.societiesystem.serviceimpl;

import com.sun.org.apache.bcel.internal.generic.RETURN;
import org.apache.ibatis.annotations.Delete;
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
    public Integer insertApplicationForm(String societyName,String contact,String contactInfo,String email,String attach ,String introduce,Long establishedTime,String type ){
        return societyMapper.insertApplicationForm(societyName,contact,contactInfo,email,attach,introduce,establishedTime,type);
    }

    @Override
    public List<Society> getUnreviewedApplicationForm(){
        return societyMapper.getUnreviewedApplicationForm();
    }

    @Override
    public List<Society> getReviewedApplicationForm(){
        return societyMapper.getReviewedApplicationForm();
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
    public Society selectAllSocietyInfoByID(Integer id){
        return societyMapper.selectAllSocietyInfoByID(id);
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
    public Integer userInSocietyActivity(Long userID,Long activityID){
        return societyMapper.userInSocietyActivity(userID,activityID);
    }

    @Override
    public Integer setSocietyAdminBySocietyIDAndTelephone(Long societyID,String telephone){
        return societyMapper.setSocietyAdminBySocietyIDAndTelephone(societyID,telephone);
    }

    @Override
    public List<Map<String,Object>> selectSocietyActivityBySocietyName(String societyName,int offset){
        return societyMapper.selectSocietyActivityBySocietyName(societyName,offset);
    }

    @Override
    public List<Map<String,Object>> selectSocietyActivityMemberInfo(Long activityID){
        return societyMapper.selectSocietyActivityMemberInfo(activityID);
    }

    @Override
    public Map<String,Object> selectUserSociety(Long userID,Long societyID){
        return societyMapper.selectUserSociety(userID,societyID);
    }


    @Override
    public Integer deletSocietyAdminBySocietyID(Long societyID){
        return societyMapper.deletSocietyAdminBySocietyID(societyID);
    }

    @Override
    public Integer insertUserActivity(Long userID,Long activityID){
        return societyMapper.insertUserActivity(userID,activityID);
    }

    @Override
    public Integer deleteUserActivity(Long userID,Long activityID){
        return societyMapper.deleteUserActivity(userID,activityID);
    }

    @Override
    public Integer insertSocietyActivity(Long societyID, String societyName, Long startTime,Long endTime,String title, String description)
    {
        return societyMapper.insertSocietyActivity( societyID,  societyName,  startTime, endTime, title,  description);

    }

    @Override
    public Integer updateSocietyEstablishAndReviewState(Integer isEstablished,Integer isReviewed,Integer id){
        return societyMapper.updateSocietyEstablishAndReviewState(isEstablished,isReviewed,id);
    }


    @Override
    public Integer updateSocietyActivity(Long activityID, Long societyID, String societyName, Long startTime,Long endTime,String title, String description){
        return societyMapper.updateSocietyActivity(activityID,societyID,societyName,startTime,endTime,title,description);
    }

    @Override
    public Integer updateSocietyMember(Integer member,Long id){
        return societyMapper.updateSocietyMember(member,id);
    }

    @Override
    public Integer deleteSocietyActivityByActivityID(Long id){
        return societyMapper.deleteSocietyActivityByActivityID(id);
    }

    @Override
    public Integer deleteSocietyMember(Long userID,String societyName){
        return societyMapper.deleteSocietyMember(userID,societyName);
    }


    @Override
    public List<SocietyActivity> selectSocietyActivityByPage(int offset,String societyName){

        return societyMapper.selectSocietyActivityByPage(offset,societyName);
    }

    @Override
    public SocietyActivity selectSocietyActivityByActivityID(Long id){
        return societyMapper.selectSocietyActivityByActivityID(id);
    }

    @Override
    public Integer countSocietyMemberBySocietyID(Long id){

        return societyMapper.countSocietyMemberBySocietyID(id);
    }

    @Override
    public Integer updateSocietyContactInfo(String contact,String contactInfo,Long societyID){
        return societyMapper.updateSocietyContactInfo(contact,contactInfo,societyID);
    }


}

