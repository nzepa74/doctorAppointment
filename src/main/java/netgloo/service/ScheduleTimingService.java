package netgloo.service;

import netgloo.dto.ScheduleTimingDetailDto;
import netgloo.dto.ScheduleTimingMasterDto;
import netgloo.helper.ResponseMessage;
import netgloo.helper.SystemDataInt;
import netgloo.models.ScheduleTimingDetail;
import netgloo.models.ScheduleTimingMaster;
import netgloo.models.User;
import netgloo.repository.ScheduleTimingDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ScheduleTimingService {
    @Autowired
    private ScheduleTimingDao scheduleTimingDao;

    public ResponseMessage addSchedule(ScheduleTimingDetailDto scheduleTimingDetailDto) throws ParseException {
        ResponseMessage responseMessage = new ResponseMessage();


        ScheduleTimingMaster scheduleTimingMaster = new ScheduleTimingMaster();
        scheduleTimingMaster.setDoctorId("nzepa");
        scheduleTimingMaster.setScheduleDate(scheduleTimingDetailDto.getScheduleDate());

        ScheduleTimingDetail scheduleTimingDetail = convertDetailDtoToEntity(scheduleTimingDetailDto);

        try {
            scheduleTimingDao.addScheduleMaster(scheduleTimingMaster);
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
        scheduleTimingDetail.setAvailableFrom(scheduleTimingDetailDto.getAvailableFrom());
        scheduleTimingDetail.setAvailableTo(scheduleTimingDetailDto.getAvailableTo());
        scheduleTimingDetail.setAppointmentStatus('A');
//        scheduleTimingDetail.setCreatedBy("Doctor");
//        scheduleTimingDetail.setCreatedDate(new Date());
//        scheduleTimingDetail.setUpdatedBy("Doctor");
//        scheduleTimingDetail.setUpdatedDate(new Date());
        scheduleTimingDetail.setScheduleDate(scheduleTimingDetailDto.getScheduleDate());
        return scheduleTimingDetail;
    }

    public ResponseMessage getScheduleDetail(String date)  {
        ResponseMessage responseMessage = new ResponseMessage();
        List<ScheduleTimingDetail> timingDetailDtos = scheduleTimingDao.getScheduleDetail(date);
        if (timingDetailDtos != null) {
            responseMessage.setDTO(timingDetailDtos);
            responseMessage.setStatus(SystemDataInt.MESSAGE_STATUS_SUCCESSFUL.value());
        }
        return responseMessage;
    }
}
