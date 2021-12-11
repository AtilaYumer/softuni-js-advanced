class Company {
    constructor() {
        this.departments = {};
    }

    addEmployee(name, salary, position, department) {
        if (!name || !salary || !position || !department || salary < 0) {
            throw new Error('Invalid input!');
        }
        if (this.departments[department]) {
            this.departments[department].set(name, { salary, position });
        } else {
            this.departments[department] = new Map();
            this.departments[department].set(name, { salary, position });
        }
        return `New employee is hired. Name: ${name}. Position: ${position}`;
    }

    bestDepartment() {
        let bestAvgSalary = Number.MIN_SAFE_INTEGER;
        let bestDep = '';
        for (let dep in this.departments) {
            let sum = 0;
            this.departments[dep].forEach((k) => {
                sum += k.salary;
            });
            let avg = sum / this.departments[dep].size;
            if (avg > bestAvgSalary) {
                bestAvgSalary = avg;
                bestDep = dep;
            }
        }
        let result = `Best Department is: ${bestDep}\nAverage salary: ${bestAvgSalary.toFixed(2)}\n`
        Array.from(this.departments[bestDep]).sort((a, b) => {
            if (b[1].salary - a[1].salary === 0) {
                return a[0].localeCompare(b[0]);
            }
            return b[1].salary - a[1].salary;
        }).forEach(e => {
            result += `${e[0]} ${e[1].salary} ${e[1].position}\n`;
        });
        return result.substring(0, result.length - 1);
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Human resources");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());

