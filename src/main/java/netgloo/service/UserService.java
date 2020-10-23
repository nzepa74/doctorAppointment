package netgloo.service;

import netgloo.dto.UserDto;
import netgloo.helper.ResponseMessage;
import netgloo.helper.SystemDataInt;
import netgloo.models.User;
import netgloo.repository.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    public ResponseMessage addUser(UserDto userDto) {
        ResponseMessage responseMessage = new ResponseMessage();

        User user = convertUserDtoToEntity(userDto);

        try {
            userDao.addUser(user);
            responseMessage.setStatus(SystemDataInt.MESSAGE_STATUS_SUCCESSFUL.value());
            responseMessage.setText("User created successfully.");
        } catch (
                Exception ex) {
            responseMessage.setStatus(SystemDataInt.MESSAGE_STATUS_UNSUCCESSFUL.value());
            responseMessage.setText("Failed to save due to " + ex.toString());
        }
        return responseMessage;
    }

    private User convertUserDtoToEntity(UserDto userDto) {
        User user = new User();
        user.setFullName(userDto.getFullName());
        user.setBirthdayDate(userDto.getBirthdayDate());
        user.setGender(userDto.getGender());
        user.setEmail(userDto.getEmail());
        return user;
    }
}
