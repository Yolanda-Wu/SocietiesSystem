package team.fishing.societiesystem.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @version V1.0
 * @Title: SocietyActivity
 * @Package
 * @Description:
 * @author: chenqi
 * @date:
 */

@Data
@NoArgsConstructor
public class SocietyActivity {
    private Long activityId;
    private Long societyId;
    private Long startTime;
    private Long endTime;
    private String title;
    private String description;
    private byte[] imgs;

}

