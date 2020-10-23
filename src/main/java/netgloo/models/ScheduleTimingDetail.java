package netgloo.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "schedule_detail")
public class ScheduleTimingDetail {
    //region private variables
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long scheduleDetailId;

    @NotNull
    private String scheduleDate;

    @NotNull
    private String availableFrom;

    @NotNull
    private String availableTo;

    @NotNull
    private Character appointmentStatus;

    @NotNull
    private String createdBy;

    @NotNull
    private Date createdDate;

    private String updatedBy;

    private Date updatedDate;
    //endregion

    //region setters and getters

    public long getScheduleDetailId() {
        return scheduleDetailId;
    }

    public void setScheduleDetailId(long scheduleDetailId) {
        this.scheduleDetailId = scheduleDetailId;
    }

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

    public Character getAppointmentStatus() {
        return appointmentStatus;
    }

    public void setAppointmentStatus(Character appointmentStatus) {
        this.appointmentStatus = appointmentStatus;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    //endregion
}
