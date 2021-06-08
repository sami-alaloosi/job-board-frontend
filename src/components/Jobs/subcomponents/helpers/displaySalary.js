export default function displaySalary (salaryRange){
    if (salaryRange.includes("h")){
        salaryRange.replace(/h/g, "").split("-");
        const hourly = salaryRange.replace(/h/g, "").split("-");
        return `$${hourly[0]} - $${hourly[1]} an hour`
    } else {
        const yearly = salaryRange.replace(/k/g, "").split("-");
        return `$${yearly[0]},000 - $${yearly[1]},000 a year`
    }
}; 