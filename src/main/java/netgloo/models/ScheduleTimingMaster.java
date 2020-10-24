package netgloo.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "schedule_master")
public class ScheduleTimingMaster {
    //region private variables
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long scheduleMasterId;

    @NotNull
    private String scheduleDate;

    @NotNull
    private String doctorId;
    //endregion

    //region setters and getters

    public long getScheduleMasterId() {
        return scheduleMasterId;
    }

    public void setScheduleMasterId(long scheduleMasterId) {
        this.scheduleMasterId = scheduleMasterId;
    }

    public String getScheduleDate() {
        return scheduleDate;
    }

    public void setScheduleDate(String scheduleDate) {
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
