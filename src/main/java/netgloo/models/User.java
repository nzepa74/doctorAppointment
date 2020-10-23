package netgloo.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Represents an User for this web application.
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotNull
    private String fullName;

    @NotNull
    private Date birthdayDate;

    @NotNull
    private Character gender;

    @NotNull
    private String email;


    public User(String fullName, Date birthdayDate, Character gender, String email) {
    }

    public User(long id) {
        this.id = id;
    }

    public User(long id, String fullName, Date birthdayDate, Character gender, String email) {
        this.id = id;
        this.fullName = fullName;
        this.birthdayDate = birthdayDate;
        this.gender = gender;
        this.email = email;
    }

    public User() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Date getBirthdayDate() {
        return birthdayDate;
    }

    public void setBirthdayDate(Date birthdayDate) {
        this.birthdayDate = birthdayDate;
    }

    public Character getGender() {
        return gender;
    }

    public void setGender(Character gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
