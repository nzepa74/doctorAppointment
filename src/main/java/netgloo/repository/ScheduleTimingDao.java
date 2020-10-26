package netgloo.repository;

import netgloo.dto.ScheduleTimingMasterDto;
import netgloo.models.ScheduleTimingDetail;
import netgloo.models.ScheduleTimingMaster;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;

@Repository
@Transactional
public class ScheduleTimingDao {

    @PersistenceContext
    private EntityManager entityManager;

    protected Session getCurrentSession() {
        return entityManager.unwrap(Session.class);
    }

    protected org.hibernate.Query sqlQuery(String query, Class dtoClazz) {
        return getCurrentSession().createSQLQuery(query).setResultTransformer(new AliasToBeanResultTransformer(dtoClazz));
    }

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

//    public ScheduleTimingMaster getScheduleMasterId(String scheduleDate, String doctorId) {
//        return (ScheduleTimingMaster) entityManager.createQuery("from ScheduleTimingMaster where scheduleDate =:scheduleDate and doctorId =:doctorId")
//                .setParameter("scheduleDate", scheduleDate)
//                .setParameter("doctorId", doctorId)
//                .getSingleResult();
//    }

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
