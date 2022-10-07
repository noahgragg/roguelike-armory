DROP TABLE IF EXISTS weapons CASCADE;
DROP TABLE IF EXISTS armor CASCADE;
DROP TABLE IF EXISTS abilities CASCADE;

CREATE TABLE weapons (
    weapon_id serial,
    name varchar(30),
    wepType varchar(20), --2h, sword, axe, mace, staff, bow, dagger, gun
    wepDmg  integer, -- Select floor(random() * 10), base - max: 5 - 200
    wepSpd varchar(15) -- verySlow, slow, average, fast, veryFast
    
);

INSERT INTO weapons (wepType, wepDmg, wepSpd, name) VALUES
('2hSword', 160, 'slow', 'Frostmourne'),
('2hAxe', 155, 'slow', 'Gorehowl'),
('Dagger', 45, 'very fast', 'Felstriker'),
('Bow', 85, 'fast', 'Thoridal'),
('Mace', 100, 'average', 'Doomhammer'),
('Gun', 500, 'very fast', 'AR-15');

CREATE TABLE armor (
    armor_id serial,
    name text,
    armDef integer, --Select floor(random() * 10)
    armRes text, --elemental res, 
    armType text, --leather, chainmail, plate, wooden, iron, steel, orichalcum, copper, cloth
    armSlot varchar(20) --helmet, shoulder, leggings, boots, ring, chest, shield, robe
    
);

INSERT INTO armor (armDef, armRes, armType, armSlot, name) VALUES
(200, 'Frost', 'Plate', 'Head', 'Helm of Domination'),
(450, 'Physical', 'Steel', 'Shield', 'Bulwark of Azzinoth'),
(85, 'Dark', 'Cloth', 'Robe', 'Robe of the Vengeful Eunuch'),
(315, 'Light', 'Steel', 'Chest', 'Breastplate of Solaire'),
(1, 'Mental', 'Paper', 'Head', 'The Dunce Cap');


CREATE TABLE spells (
    spell_id serial,
    name varchar(30),
    elemType varchar(20), --ref elemental table
    spellDesc text
);

INSERT INTO spells (name, elemType, spellDesc) VALUES
('Bladestorm', 'Physical', 'Spinny circle of hitting'),
('Blizzard', 'Frost', 'Ice shards rain down on target area'),
('Fireball', 'Fire', 'As the name implies'),
('Prayer', 'Light', 'Heal an ally for 35% of their max health'),
('Fog', 'Dark', 'Cover an area in shadow, restricting vision');

CREATE TABLE names (
    id serial,
    verb text,
    noun text
);

CREATE TABLE elemental (
    element_id serial,
    elemType text -- Physical, Fire, Frost, Electric, Dark, Light, Mental
);

