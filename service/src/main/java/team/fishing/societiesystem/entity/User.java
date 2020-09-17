package team.fishing.societiesystem.entity;


import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @version V1.0
 * @Title: User
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */

@Data
@NoArgsConstructor
public class User {
    private Long id;
    private String userPassword;
    private  String name;
    private int type;
    private String telephoneNumber;
    private String email;
    private String address;
    private String school;
    private String gender;
    private String introduce;


}

