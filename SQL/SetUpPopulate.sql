DECLARE @ModifiedBy VARCHAR(15) = 'SCRIPT SetUp'

INSERT INTO Country VALUES('Sverige', 'SWE', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO Country VALUES('Ghana', 'GHA', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO Country VALUES('Sydafrika', 'ZAF', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO Country VALUES('Island', 'IS', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO Country VALUES('Finland', 'FIN', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO Country VALUES('Liberia', 'LBR', @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())

DECLARE @ID INT = (SELECT ID FROM Country WHERE Title = 'Sverige')

INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Gävle', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Stockholm', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Norrköping', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Malmö', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Göteborg', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Mjällby', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Helsingborg', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Åtvidaberg', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Borås', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Falkenberg', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Halmstad', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Kalmar', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Örebro', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Upplands Väsby', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())
INSERT INTO City(Title, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) VALUES('Hällevik', @ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE())

INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Malmö FF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Malmö'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'BK Häcken', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Göteborg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Mjällby AIF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Mjällby'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Helsingborg IF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Helsingborg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Åtvidaberg', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Åtvidaberg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'IF Brommapojkarna', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Stockholm'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'IFK Göteborg', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Göteborg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'AIK', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Stockholm'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'IF Elfsborg', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Borås'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Djurgårdens IF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Stockholm'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'IFK Norrköping', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Norrköping'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Falkenbergs FF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Falkenberg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Kalmar FF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Kalmar'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Halmstad BK', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Halmstad'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Gefle IF', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Gävle'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'Örebro SK', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Örebro'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'GAIS', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Göteborg'
INSERT INTO Team(Title, CityID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate) 
SELECT 'AFC United', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM City WHERE Title = 'Upplands Väsby'

INSERT INTO Competition(Title, StartDate, EndDate, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate)
SELECT 'Allsvenskan', '2014-03-30 15:00:00', '2014-11-02 17:00:00', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM Country WHERE Title = 'Sverige'
INSERT INTO Competition(Title, StartDate, EndDate, CountryID, ModifiedBy, ModifiedDate, CreatedBy, CreatedDate)
SELECT 'Svenska Cupen', '2013-05-21 19:00:00', '2014-05-18 17:00:00', ID, @ModifiedBy, GETUTCDATE(), @ModifiedBy, GETUTCDATE() FROM Country WHERE Title = 'Sverige'

