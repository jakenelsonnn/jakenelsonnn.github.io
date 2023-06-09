/*
Jacob A. Nelson, UMass Lowell Computer Science, jacob_nelson@student.uml.edu

File: hw3.js
GUI Assignment: HW3: Creating an Interactive Dynamic Table
Description: This is the javascript for HW3. For more information about HW3, please
look at index.html.

Copyright (c) 2023 by Jacob A. Nelson. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
Last modified by JN on June 16, 2023 at 9:40 AM
*/

$(document).ready(function () {
    // Add validation rules to width form
    $("#width-form").validate({
        rules: {
            widthstart: {
                required: true,
                number: true
            },
            widthend: {
                required: true,
                number: true
            }
        },
        messages: {
            widthstart: {
                required: "Please enter a width start value.",
                number: "Please enter a valid number."
            },
            widthend: {
                required: "Please enter an width end value.",
                number: "Please enter a valid number."
            }
        },
        submitHandler: function (form) {
            // Form submission logic
            if ($("#width-form").valid() && $("#height-form").valid()) {
                generateTable();
            } else {
                createAlert("Please fix the validation errors before generating the table.");
            }
            return false; // Prevent form submission
        }
    });

    // Custom validation method for width range check
    $.validator.addMethod("widthRangeCheck", function (value, element) {
        var start = parseFloat($("#widthstart").val());
        var end = parseFloat($("#widthend").val());
        var range = end - start;
        return range <= 100;
    }, "The width range must be less than or equal to 100.");

    // Add custom rule for range check
    $("#widthend").rules("add", {
        widthRangeCheck: true
    });

    // Custom validation method for lessthan
    $.validator.addMethod("widthEndLessThanStart", function (value, element) {
        var start = parseFloat($("#widthstart").val());
        var end = parseFloat($("#widthend").val());
        return start < end;
    }, "The Width Start value must be less than the Width End value!");

    // Add custom rule for lessthan
    $("#widthstart").rules("add", {
        widthEndLessThanStart: true
    });

    // Custom validation method for greaterthan
    $.validator.addMethod("widthStartGreaterThanEnd", function (value, element) {
        var start = parseFloat($("#widthstart").val());
        var end = parseFloat($("#widthend").val());
        return start < end;
    }, "The Width End value must be greater than the Width Start value!");

    // Add custom rule for greaterthan
    $("#widthend").rules("add", {
        widthStartGreaterThanEnd: true
    });

    /////////////////////////////////// height

    // Add validation rules to height form
    $("#height-form").validate({
        rules: {
            heightstart: {
                required: true,
                number: true
            },
            heightend: {
                required: true,
                number: true
            }
        },
        messages: {
            heightstart: {
                required: "Please enter a height start value.",
                number: "Please enter a valid number."
            },
            heightend: {
                required: "Please enter an height end value.",
                number: "Please enter a valid number."
            }
        },
        submitHandler: function (form) {
            // Form submission logic
            if ($("#width-form").valid() && $("#height-form").valid()) {
                generateTable();
            } else {
                createAlert("Please fix the validation errors before generating the table.");
            }
            return false; // Prevent form submission
        }
    });

    // Custom validation method for range check
    $.validator.addMethod("heightRangeCheck", function (value, element) {
        var start = parseFloat($("#heightstart").val());
        var end = parseFloat($("#heightend").val());
        var range = end - start;
        return range <= 100;
    }, "The height range must be less than or equal to 100.");

    // Add custom rule for range check
    $("#heightend").rules("add", {
        heightRangeCheck: true
    });

    // Custom validation method for lessthan
    $.validator.addMethod("heightEndLessThanStart", function (value, element) {
        var start = parseFloat($("#heightstart").val());
        var end = parseFloat($("#heightend").val());
        return start < end;
    }, "The Height Start value must be less than the Height End value!");

    // Add custom rule for lessthan
    $("#heightstart").rules("add", {
        heightEndLessThanStart: true
    });

    // Custom validation method for greaterthan
    $.validator.addMethod("heightStartGreaterThanEnd", function (value, element) {
        var start = parseFloat($("#heightstart").val());
        var end = parseFloat($("#heightend").val());
        return start < end;
    }, "The Height End value must be greater than the Height Start value!");

    // Add custom rule for greaterthan
    $("#heightend").rules("add", {
        heightStartGreaterThanEnd: true
    });
});

// programatically generate the mult. table
function generateTable() {
    var width_start = parseInt(document.getElementById("widthstart").value);
    var width_end = parseInt(document.getElementById("widthend").value);

    var height_start = parseInt(document.getElementById("heightstart").value);
    var height_end = parseInt(document.getElementById("heightend").value);

    // Check if both forms are valid
    if ($("#width-form").valid() && $("#height-form").valid()) {
        // hide any previous alert message
        hideAlert();

        var tableContainer = document.getElementById("tableContainer");
        // clear previously created table
        tableContainer.innerHTML = "";

        // create the table and the table body
        var table = document.createElement("table");
        var tableBody = document.createElement("tbody");

        // create the first (empty) cell
        var firstRow = document.createElement("tr");
        var cell = document.createElement("th");
        cell.textContent = 0;
        firstRow.appendChild(cell);

        // create the first row after the empty cell
        for (var i = width_start; i <= width_end; i++) {
            var cell = document.createElement("th");
            cell.textContent = i;
            firstRow.appendChild(cell);
        }
        tableBody.appendChild(firstRow);

        // create the remaining rows
        for (var i = height_start; i <= height_end; i++) {
            var row = document.createElement("tr");

            // first column cell
            var firstCell = document.createElement("th");
            firstCell.textContent = i;
            row.appendChild(firstCell);

            // remaining cells
            for (var j = width_start; j <= width_end; j++) {
                var cell = document.createElement("td");
                cell.textContent = i * j;
                row.appendChild(cell);
            }
            tableBody.appendChild(row);
        }

        // finally, assemble the table
        table.appendChild(tableBody);
        tableContainer.appendChild(table);
    } else {
        createAlert("Please fix the validation errors before generating the table.");
    }
}


// makes an alert visible on the page. used for input validation.
function createAlert(message) {
    var alertBox = document.getElementById("alert");
    alertBox.style.display = "block";
    alertBox.textContent = message;
}

// hides the alert.
function hideAlert() {
    var alertBox = document.getElementById("alert");
    alertBox.style.display = "none";
}