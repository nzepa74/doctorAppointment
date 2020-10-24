package netgloo.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.math.BigInteger;

@Entity
@Table(name = "schedule_master")
public class ScheduleTimingMaster {
    //region private variables
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private BigInteger scheduleMasterId;

    @NotNull
    private String scheduleDate;

    @NotNull
    private String doctorId;
    //endregion

    //region setters and getters


    public BigInteger getScheduleMasterId() {
        return scheduleMasterId;
    }

    public void setScheduleMasterId(BigInteger scheduleMasterId) {
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
