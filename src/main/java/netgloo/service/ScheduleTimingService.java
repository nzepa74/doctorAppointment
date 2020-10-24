package netgloo.service;

import netgloo.dto.ScheduleTimingDetailDto;
import netgloo.helper.ResponseMessage;
import netgloo.helper.SystemDataInt;
import netgloo.models.ScheduleTimingDetail;
import netgloo.models.ScheduleTimingMaster;
import netgloo.repository.ScheduleTimingDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

@Service
public class ScheduleTimingService {
    @Autowired
    private ScheduleTimingDao scheduleTimingDao;

    public static final String doctorId = "nzepa";

    public ResponseMessage addSchedule(ScheduleTimingDetailDto scheduleTimingDetailDto) {
        ResponseMessage responseMessage = new ResponseMessage();
        ScheduleTimingMaster scheduleTimingMasterDb = scheduleTimingDao.getScheduleMasterId(
                scheduleTimingDetailDto.getScheduleDate(), doctorId);

        BigInteger scheduleTimingMasterId = scheduleTimingMasterDb.getScheduleMasterId();
        scheduleTimingMasterId = scheduleTimingMasterId == null ? scheduleTimingDetailDto.getScheduleMasterId() : scheduleTimingMasterId;

        ScheduleTimingMaster scheduleTimingMaster = new ScheduleTimingMaster();
        scheduleTimingMaster.setScheduleMasterId(scheduleTimingMasterId);
        scheduleTimingMaster.setDoctorId(doctorId);
        scheduleTimingMaster.setScheduleDate(scheduleTimingDetailDto.getScheduleDate());

        ScheduleTimingDetail scheduleTimingDetail = convertDetailDtoToEntity(scheduleTimingDetailDto);

        try {
            BigInteger scheduleMasterId = scheduleTimingDao.addScheduleMaster(scheduleTimingMaster);
            scheduleTimingDetail.setScheduleMasterId(scheduleMasterId);
            scheduleTimingDao.addScheduleDetail(scheduleTimingDetail);
            responseMessage.setStatus(SystemDataInt.MESSAGE_STATUS_SUCCESSFUL.value());
            responseMessage.setText("Saved successfully.");
        } catch (
                Exception ex) {
            responseMessage.setStatus(SystemDataInt.MESSAGE_STATUS_UNSUCCESSFUL.value());
            responseMessage.setText("Failed to save due to " + ex.toString());
        }
        return responseMessage;
    }

    private ScheduleTimingDetail convertDetailDtoToEntity(ScheduleTimingDetailDto scheduleTimingDetailDto) {
        ScheduleTimingDetail scheduleTimingDetail = new ScheduleTimingDetail();
        scheduleTimingDetail.setScheduleDetailId(scheduleTimingDetailDto.getScheduleDetailId());
        scheduleTimingDetail.setScheduleDate(scheduleTimingDetailDto.getScheduleDate());
        scheduleTimingDetail.setAvailableFrom(scheduleTimingDetailDto.getAvailableFrom());
        scheduleTimingDetail.setAvailableTo(scheduleTimingDetailDto.getAvailableTo());
        scheduleTimingDetail.setAppointmentStatus('A');
        scheduleTimingDetail.setCreatedBy(doctorId);
        scheduleTimingDetail.setCreatedDate(new Date());
        scheduleTimingDetail.setUpdatedBy(doctorId);
        scheduleTimingDetail.setUpdatedDate(new Date());
        return scheduleTimingDetail;
    }

    public ResponseMessage getScheduleDetail(String scheduleDate) {
        ResponseMessage responseMessage = new ResponseMessage();
        ScheduleTimingMaster scheduleTimingMaster = scheduleTimingDao.getScheduleMasterId(scheduleDate, doctorId);
        BigInteger scheduleMasterId = scheduleTimingMaster.getScheduleMasterId();

        List<ScheduleTimingDetail> timingDetailDtos = scheduleTimingDao.getScheduleDetail(scheduleMasterId);
        if (timingDetailDtos != null) {
            responseMessage.setDTO(timingDetailDtos);
            responseMessage.setStatus(SystemDataInt.MESSAGE_STATUS_SUCCESSFUL.value());
        }
        return responseMessage;
    }
}
