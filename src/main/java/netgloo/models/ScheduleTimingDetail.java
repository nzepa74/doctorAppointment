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

    //endregion
}
