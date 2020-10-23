package netgloo.controllers;

import netgloo.dto.UserDto;
import netgloo.helper.ResponseMessage;
import netgloo.models.User;
import netgloo.repository.UserDao;
import netgloo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @ResponseBody
    @RequestMapping(value = "/addUser", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseMessage addUser(@RequestBody UserDto userDto) {
        return userService.addUser(userDto);
    }

    /**
     * Delete the user with the passed id.
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public String delete(long id) {
        try {
            User user = new User(id);
            userDao.delete(user);
        } catch (Exception ex) {
            return "Error deleting the user: " + ex.toString();
        }
        return "User succesfully deleted!";
    }

    /**
     * Retrieve the id for the user with the passed email address.
     */
    @ResponseBody
    @RequestMapping(value = "/get-by-email")
    public String getByEmail(String email) {
        String userId;
        try {
            User user = userDao.getByEmail(email);
            userId = String.valueOf(user.getId());
        } catch (Exception ex) {
            return "User not found: " + ex.toString();
        }
        return "The user id is: " + userId;
    }

    /**
     * Update the email and the name for the user indentified by the passed id.
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public String updateName(long id, String email, String name) {
        try {
            User user = userDao.getById(id);
            user.setEmail(email);
            user.setFullName(name);
            userDao.update(user);
        } catch (Exception ex) {
            return "Error updating the user: " + ex.toString();
        }
        return "User succesfully updated!";
    }

    // ------------------------
    // PRIVATE FIELDS
    // ------------------------

    // Wire the UserDao used inside this controller.
    @Autowired
    private UserDao userDao;

} // class UserController
