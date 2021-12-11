function solve() {
    document.querySelector('#btnSend').addEventListener('click', onClick);

    function findBestRestaurant(inputs) {
        let restaurants = extractRestaurants(inputs);
        calculateSalaries(restaurants);
        const bestRestaurant = finBestRestaurantFromExtracted(restaurants);
        bestRestaurant.workers = bestRestaurant.workers.sort((a, b) => b.salary - a.salary);
        return bestRestaurant;
    }

    function extractRestaurants(inputs) {
        return inputs.reduce((result, input) => {
            let [restaurant, workersInfo] = input.split(' - ');
            let workers = workersInfo.split(', ').map(workerInfo => {
                let [name, salary] = workerInfo.split(' ');
                return {
                    name: name,
                    salary: Number(salary)
                }
            });
            let find = result.find(el => el.name === restaurant);
            if (find) {
                find.workers = find.workers.concat(workers);
            } else {
                result.push({
                    name: restaurant,
                    workers: workers
                })
            }
            return result;
        }, []);
    }

    function calculateSalaries(restaurants) {
        restaurants.forEach(restaurant => {
            let sum = 0;
            let bestSalary = Number.MIN_SAFE_INTEGER;
            for (const worker of restaurant.workers) {
                const salary = worker.salary;
                sum += salary;
                if (salary > bestSalary) {
                    bestSalary = salary;
                }
            }
            restaurant.bestSalary = bestSalary;
            restaurant.averageSalary = sum / restaurant.workers.length;
        })
    }

    function finBestRestaurantFromExtracted(restaurants) {
        return restaurants.reduce((bestResult, currentRestaurant) => {
            if (currentRestaurant.averageSalary > bestResult.averageSalary) {
                bestResult = currentRestaurant;
            }
            return bestResult;
        }, restaurants[0]);
    }

    function getBestRestaurantMessage(restaurant) {
        return `Name: ${restaurant.name} Average Salary: ${restaurant.averageSalary.toFixed(2)} `
            + `Best Salary: ${restaurant.bestSalary.toFixed(2)}`
    }

    function getWorkersMessage(workers) {
        return workers.map(worker => {
            return `Name: ${worker.name} With Salary: ${worker.salary}`
        }).join(' ');
    }

    function onClick() {
        const inputs = JSON.parse(document.querySelector('#inputs textarea').value);
        const bestRestaurant = findBestRestaurant(inputs);

        document.querySelector('#bestRestaurant p').textContent = getBestRestaurantMessage(bestRestaurant);
        document.querySelector('#workers p').textContent = getWorkersMessage(bestRestaurant.workers);
    }
}