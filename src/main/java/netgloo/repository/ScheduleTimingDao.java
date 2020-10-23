package netgloo.repository;

import netgloo.models.ScheduleTimingDetail;
import netgloo.models.ScheduleTimingMaster;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class ScheduleTimingDao {
    @PersistenceContext
    private EntityManager entityManager;

    public void addScheduleMaster(ScheduleTimingMaster scheduleTimingMaster) {
        entityManager.merge(scheduleTimingMaster);
    }

    public void addScheduleDetail(ScheduleTimingDetail scheduleTimingDetail) {
        entityManager.persist(scheduleTimingDetail);
    }


    public List<ScheduleTimingDetail> getScheduleDetail(String scheduleDate) {

        return entityManager.createQuery("from ScheduleTimingDetail where scheduleDate =:scheduleDate").
                setParameter("scheduleDate", scheduleDate)
                .getResultList();
    }

}
