package netgloo.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "schedule_master")
public class ScheduleTimingMaster {
    //region private variables
    @Id
//    @Column(name = "scheduleDate")
    private String scheduleDate;

    @NotNull
//    @Column(name = "doctorId")
    private String doctorId;
    //endregion

    //region setters and getters

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
