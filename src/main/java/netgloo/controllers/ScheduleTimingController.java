package netgloo.controllers;


import netgloo.dto.ScheduleTimingDetailDto;
import netgloo.dto.ScheduleTimingMasterDto;
import netgloo.dto.UserDto;
import netgloo.helper.ResponseMessage;
import netgloo.models.User;
import netgloo.service.ScheduleTimingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;

@Controller
@RequestMapping("/scheduleTiming")
public class ScheduleTimingController {
    @Autowired
    private ScheduleTimingService scheduleTimingService;

    @ResponseBody
    @RequestMapping(value = "/addSchedule", method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage addSchedule(@RequestBody ScheduleTimingDetailDto scheduleTimingDetailDto) throws ParseException {
        return scheduleTimingService.addSchedule(scheduleTimingDetailDto);
    }

    @ResponseBody
    @RequestMapping(value = "/getScheduleDetail")
    public ResponseMessage getScheduleDetail(String scheduleDate) throws ParseException {
        return scheduleTimingService.getScheduleDetail(scheduleDate);
    }

}
