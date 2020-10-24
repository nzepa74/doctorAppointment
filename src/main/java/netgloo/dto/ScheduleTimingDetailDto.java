package netgloo.dto;

import java.math.BigInteger;

public class ScheduleTimingDetailDto {
    //region setters and getters
    private String scheduleDate;
    private String availableFrom;
    private String availableTo;
     private BigInteger scheduleDetailId;
     private BigInteger scheduleMasterId;
    private Character appointmentStatus;
    //endregion

    public String getScheduleDate() {
        return scheduleDate;
    }

    public void setScheduleDate(String scheduleDate) {
        this.scheduleDate = scheduleDate;
    }

    public String getAvailableFrom() {
        return availableFrom;
    }

    public void setAvailableFrom(String availableFrom) {
        this.availableFrom = availableFrom;
    }

    public String getAvailableTo() {
        return availableTo;
    }

    public void setAvailableTo(String availableTo) {
        this.availableTo = availableTo;
    }

    public BigInteger getScheduleDetailId() {
        return scheduleDetailId;
    }

    public void setScheduleDetailId(BigInteger scheduleDetailId) {
        this.scheduleDetailId = scheduleDetailId;
    }

    public BigInteger getScheduleMasterId() {
        return scheduleMasterId;
    }

    public void setScheduleMasterId(BigInteger scheduleMasterId) {
        this.scheduleMasterId = scheduleMasterId;
    }

    public Character getAppointmentStatus() {
        return appointmentStatus;
    }

    public void setAppointmentStatus(Character appointmentStatus) {
        this.appointmentStatus = appointmentStatus;
    }
}
