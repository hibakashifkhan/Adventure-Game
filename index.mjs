import inquirer from "inquirer";
//****************************************
//Games Variables
//****************************************
let enemies = ["Skeleton", "Monster", "Zombie", "Assasin"];
let EnemiesMaximumHealth = 100;
let enemyAttackDamage = 15;
/****************************************
//Player Variables
//****************************************/
let PlayerHealth = 90;
let AttackDamageToEnemy = 55;
let HealthPotionCapacity = 3;
let HealthPotionHeal = 25;
let HealthPotionDropChance = 50;
/****************************************
//While loop Condition
//****************************************/
let gameRunning = true;
console.log("Welcome to the Dead Zone!!");
Game: while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * EnemiesMaximumHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let Enemy = enemies[enemyIndex];
    console.log(`*${Enemy} has been spawned*\n`);
    while (enemyHealth > 0) {
        console.log(`Your Current Health : ${PlayerHealth}`);
        console.log(`${Enemy}'s Health : ${enemyHealth}`);
        let options = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: "Actions : ",
            choices: ["1.Attack ", "2.Use Health Potion", "3. Run"]
        });
        if (options.ans === "1.Attack ") {
            let DamageToEnemy = Math.floor(Math.random() * AttackDamageToEnemy + 1);
            let DamageToPlayer = Math.floor(Math.random() * enemyAttackDamage + 1);
            enemyHealth -= DamageToEnemy;
            PlayerHealth -= DamageToPlayer;
            console.log(`You attacked the ${Enemy} for ${DamageToEnemy}. `);
            console.log(`The ${Enemy} attacked you for ${DamageToPlayer}.`);
            if (PlayerHealth < 1) {
                console.log("You Have Taken Too much Damage. Unable to Continue.");
                break;
            }
        }
        else if (options.ans === "2.Use Health Potion") {
            if (HealthPotionCapacity > 0) {
                PlayerHealth += HealthPotionHeal;
                HealthPotionCapacity--;
                console.log(`${HealthPotionHeal} Health Gained!`);
                console.log(`Total Health = ${PlayerHealth}`);
                console.log(`${HealthPotionCapacity} Health Potions Left.`);
            }
            else {
                console.log("*No Health Potions Left* , Must Kill enemy To get Health Potions.");
            }
        }
        else if (options.ans === "3. Run") {
            console.log(`Ran away to hide from ${Enemy}`);
            continue Game;
        }
    }
    if (PlayerHealth < 1) {
        console.log("You are Dead");
        break;
    }
    console.log(`${Enemy} was Killed!`);
    console.log(`${PlayerHealth} left.`);
    let randomNo = Math.floor(Math.random() * 100 + 1);
    if (randomNo < HealthPotionDropChance) {
        HealthPotionCapacity++;
        console.log("Enemy dropped a Health Potion");
        console.log(`Player Health = ${PlayerHealth}`);
        console.log(`${HealthPotionCapacity} Health Potions Left.`);
    }
    let UserOptions = await inquirer.prompt({
        name: "ans",
        type: "list",
        message: " What would you like to do now?",
        choices: ["1.Continue", "2.Exit"]
    });
    if (UserOptions.ans === "1.Continue") {
        console.log("You have cbeen Continued to your Adventure Game!");
    }
    else {
        console.log("Game Over");
        break;
    }
    console.log("Thanks for Playing!");
}
