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
    private String name;
    private String contact;
    private String contactInfo;
    private String email;
    private String type;
    private Long establishedTime;
    private Integer members;
    private String introduce;
    private Integer isEstablished;
    private String attach;
    private Integer isReviewed;

}

