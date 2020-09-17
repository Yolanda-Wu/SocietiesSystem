package team.fishing.societiesystem.entity;



import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @version V1.0
 * @Title: Society
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */

@Data
@NoArgsConstructor
public class Society {
    private Long id;
    private Long name;
    private String contact;
    private String contactInfo;
    private String email;
    private String type;
    private Date establishedTime;
    private int members;
    private String introduce;
    private boolean isEstablished;

}

