DECLARE @ModifiedBy VARCHAR(15) = 'SCRIPT SetUp'

INSERT INTO Country VALUES('Sverige', 'SWE', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO Country VALUES('Ghana', 'GHA', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO Country VALUES('Sydafrika', 'ZAF', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO Country VALUES('Island', 'IS', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO Country VALUES('Finland', 'FIN', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO Country VALUES('Liberia', 'LBR', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())

DECLARE @ID INT = (SELECT ID FROM Country WHERE Title = 'Sverige')

INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('G�vle', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Stockholm', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Norrk�ping', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Malm�', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('G�teborg', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Mj�llby', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Helsingborg', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('�tvidaberg', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Bor�s', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Falkenberg', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Halmstad', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Kalmar', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('�rebro', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Upplands V�sby', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('H�llevik', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())

INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Malm� FF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Malm�'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'BK H�cken', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'G�teborg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Mj�llby AIF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Mj�llby'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Helsingborg IF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Helsingborg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT '�tvidaberg', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = '�tvidaberg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'IF Brommapojkarna', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Stockholm'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'IFK G�teborg', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'G�teborg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'AIK', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Stockholm'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'IF Elfsborg', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Bor�s'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Djurg�rdens IF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Stockholm'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'IFK Norrk�ping', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Norrk�ping'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Falkenbergs FF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Falkenberg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Kalmar FF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Kalmar'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Halmstad BK', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Halmstad'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Gefle IF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'G�vle'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT '�rebro SK', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = '�rebro'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'GAIS', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'G�teborg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'AFC United', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Upplands V�sby'

INSERT INTO Competition(Title, StartDate, EndDate, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate)
SELECT 'Allsvenskan', '2014-03-30 15:00:00', '2014-11-02 17:00:00', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM Country WHERE Title = 'Sverige'
INSERT INTO Competition(Title, StartDate, EndDate, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate)
SELECT 'Svenska Cupen', '2013-05-21 19:00:00', '2014-05-18 17:00:00', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM Country WHERE Title = 'Sverige'

