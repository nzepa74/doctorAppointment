package netgloo.dto;

import java.util.Date;
import java.util.List;

public class ScheduleTimingMasterDto {
    //region private variables
    private Date scheduleDate;
    private String doctorId;
     //endregion

    //region setters and getters
    public Date getScheduleDate() {
        return scheduleDate;
    }

    public void setScheduleDate(Date scheduleDate) {
        this.scheduleDate = scheduleDate;
    }

    public String getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(String doctorId) {
        this.doctorId = doctorId;
    }

    //endregion
}
