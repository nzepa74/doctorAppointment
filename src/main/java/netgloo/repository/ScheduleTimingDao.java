package netgloo.repository;

import netgloo.dto.ScheduleTimingMasterDto;
import netgloo.helper.BaseDao;
import netgloo.models.ScheduleTimingDetail;
import netgloo.models.ScheduleTimingMaster;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;

@Repository
@Transactional
public class ScheduleTimingDao extends BaseDao {

    @PersistenceContext
    private EntityManager entityManager;

    public BigInteger addScheduleMaster(ScheduleTimingMaster scheduleTimingMaster) {
        return entityManager.merge(scheduleTimingMaster).getScheduleMasterId();
    }

    public void addScheduleDetail(ScheduleTimingDetail scheduleTimingDetail) {
        entityManager.merge(scheduleTimingDetail);
    }

    public ScheduleTimingMasterDto getScheduleMasterId(String scheduleDate, String doctorId) {

        String sql = "select m.scheduleMasterId from schedule_master m where m.scheduleDate =:scheduleDate and m.doctorId =:doctorId";
        Query result_query = sqlQuery(sql, ScheduleTimingMasterDto.class)
                .setParameter("scheduleDate", scheduleDate)
                .setParameter("doctorId", doctorId);
        return (ScheduleTimingMasterDto) result_query.uniqueResult();
    }

    public List<ScheduleTimingDetail> getScheduleDetail(BigInteger scheduleMasterId) {
        return entityManager.createQuery("from ScheduleTimingDetail where scheduleMasterId =:scheduleMasterId").
                setParameter("scheduleMasterId", scheduleMasterId)
                .getResultList();
    }

    public void deleteScheduleDetail(ScheduleTimingDetail scheduleTimingDetail) {
        if (entityManager.contains(scheduleTimingDetail))
            entityManager.remove(scheduleTimingDetail);
        else
            entityManager.remove(entityManager.merge(scheduleTimingDetail));
    }
}
