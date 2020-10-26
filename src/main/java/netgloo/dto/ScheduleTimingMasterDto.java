package netgloo.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

public class ScheduleTimingMasterDto {
    //region private variables
    private Date scheduleDate;
    private String doctorId;
    private BigInteger scheduleMasterId;
     //endregion

    //region setters and getters

    public BigInteger getScheduleMasterId() {
        return scheduleMasterId;
    }

    public void setScheduleMasterId(BigInteger scheduleMasterId) {
        this.scheduleMasterId = scheduleMasterId;
    }

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
