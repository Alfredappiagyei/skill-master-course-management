-- this file cotains the 
-- TRIGGERS and PROCEDURES and CURSORS for INSERTING AND RETRIEVING INFORMATION
-- from the database


--create a new employee

CREATE OR REPLACE PROCEDURE new_employee(
    in_employeeFName in employee.employeeFName%type,
    in_employeeLName in employee.employeeLName%type,
    in_employeeEmail in employee.employeeEmail%type,
    in_employeeContact in employee.employeeContact%type,
    out_newEmployeeNo OUT employee.employeeNo%type
) IS
BEGIN
    INSERT INTO Employee(employeeFName, employeeLName, employeeEmail, employeeContact)
    VALUES(in_employeeFName, in_employeeLName, in_employeeEmail, in_employeeContact)
    RETURNING employeeNo INTO out_newEmployeeNo;
END;
/


--create a new client
CREATE OR REPLACE PROCEDURE new_client(
    in_clientName IN client.clientName%type,
    in_clientEmail IN client.clientEmail%type,
    in_clientContact IN client.clientContact%type,
    out_newclientNo OUT client.clientNo%type
) IS
BEGIN
    INSERT INTO Client(clientName, clientEmail, clientContact)
    VALUES (in_clientName, in_clientEmail, in_clientContact)
    RETURNING clientNo INTO out_newclientNo;
END;
/


--create a new delegate

CREATE OR REPLACE PROCEDURE new_delegate(
    in_delegateTitle IN Delegate.delegateTitle%type,
    in_delegateFName IN Delegate.delegateFName%type,
    in_delegateLName IN Delegate.delegateLName%type,
    in_delegateStreet IN Delegate.delegateStreet%type,
    in_delegateCity IN Delegate.delegateCity%type,
    in_delegateState IN Delegate.delegateState%type,
    in_delegateZipCode IN Delegate.delegateZipCode%type,
    in_attTelNo IN Delegate.attTelNo%type,
    in_attFaxNo IN Delegate.attFaxNo%type,
    in_attEmailAddress IN Delegate.attEmailAddress%type,
    in_clientNo IN client.clientNo%type,
    out_newdelegateNo OUT Delegate.delegateNo%type
) IS
BEGIN
    INSERT INTO Delegate(
        delegateTitle,
        delegateFName,
        delegateLName,
        delegateStreet,
        delegateCity,
        delegateState,
        delegateZipCode,
        attTelNo,
        attFaxNo,
        attEmailAddress,
        clientNo)
    VALUES(
        in_delegateTitle,
        in_delegateFName,
        in_delegateLName,
        in_delegateStreet,
        in_delegateCity,
        in_delegateState,
        in_delegateZipCode,
        in_attTelNo,
        in_attFaxNo,
        in_attEmailAddress,
        in_clientNo
    )
    RETURNING delegateNo INTO out_newdelegateNo;
END;
/



-- create a new registration
create or replace procedure register_delegate(
    in_registraionDate in Registration.registrationDate%type,
    in_delegateNo in Delegate.delegateNo%type,
    in_courseFeeNo in CourseFee.courseFeeNo%type,
    in_registerEmployeeNo in Registration.registerEmployeeNo%type,
    in_courseNo in Course.courseNo%type
) is 
begin
    insert into Registration(
        registrationDate,
        delegateNo, 
        courseFeeNo, 
        registerEmployeeNo, 
        courseNo)
    values(
        in_registraionDate, 
        in_delegateNo, 
        in_courseFeeNo, 
        in_registerEmployeeNo, 
        in_courseNo
    );
end;
/

-- create an invoice for registration
create or replace procedure create_invoice(
    in_dateRaised in Invoice.dateRaised%type,
    in_datePaid in Invoice.datePaid%type,
    in_creditCardNo in Invoice.creditCardNo%type,
    in_holdersName in Invoice.holdersName%type,
    in_expiryDate in Invoice.expiryDate%type,
    in_registrationNo in Invoice.registrationNo%type,
    in_pMethodNo in Invoice.pMethodNo%type
) is 
begin
    insert into Invoice(
        dateRaised,
        datePaid,
        creditCardNo,
        holdersName,
        expiryDate,
        registrationNo,
        pMethodNo)
    values(
        in_dateRaised,
        in_datePaid,
        in_creditCardNo,
        in_holdersName,
        in_expiryDate,
        in_registrationNo,
        in_pMethodNo
    );
end;
/

--book a location for a registration
create or replace procedure book_location(
    in_bookingDate in Booking.bookingDate%type,
    in_locationNo in Location.locationNo%type,
    in_courseNo in Course.courseNo%type,
    in_bookingEmployeeNo in Booking.bookingEmployeeNo%type
) is 
begin
    insert into Booking(
        bookingDate,
        locationNo,
        courseNo,
        bookingEmployeeNo)
    values(
        in_bookingDate,
        in_locationNo,
        in_courseNo,
        in_bookingEmployeeNo
    );
end;
/

-- RETRIVE RECORDS
-- front end with JS

-- RETRIEVING EMPLOYEE DETAILS
CREATE OR REPLACE PROCEDURE get_employees_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM employee;
END;
/

--RETRIEVING CLIENT DETAILS
CREATE OR REPLACE PROCEDURE get_client_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM client;
END;
/

--RETRIEVING DELEGATE DETAILS
CREATE OR REPLACE PROCEDURE get_delegate_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM delegate;
END;
/

--RETRIEVING COURSE TYPE DETAILS
CREATE OR REPLACE PROCEDURE get_coursetype_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM coursetype;
END;
/

--RETRIEVING COURSE DETAILS
CREATE OR REPLACE PROCEDURE get_course_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM course;
END;
/

--RETRIEVING COURSE FEE DETAILS
CREATE OR REPLACE PROCEDURE get_coursefee_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM coursefee;
END;
/

--RETRIEVING PAYMENT METHOD DETAILS
CREATE OR REPLACE PROCEDURE get_paymentmethod_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM paymentmethod;
END;
/

--RETRIEVING LOCATION DETAILS
CREATE OR REPLACE PROCEDURE get_location_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM location;
END;
/

--RETRIEVING REGISTRATION DETAILS
CREATE OR REPLACE PROCEDURE get_registration_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM registration;
END;
/

--RETRIEVING INVOICE DETAILS
CREATE OR REPLACE PROCEDURE get_invoice_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM invoice;
END;
/

--RETRIEVING BOOKING DETAILS
CREATE OR REPLACE PROCEDURE get_booking_details (p_cursor OUT SYS_REFCURSOR) AS
BEGIN
  OPEN p_cursor FOR
    SELECT * FROM booking;
END;
/