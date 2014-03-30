
(function(dicomParser) {
    module("dicomParser.dataSet");

    function makeTestData()
    {
        var elements = [
            // x22114433          US         2          0xadde
            [0x11,0x22,0x33,0x44, 0x55,0x53, 0x02,0x00, 0xde,0xad],
            // x22114434          OB                    4                    "O\B"
            [0x11,0x22,0x34,0x44, 0x4F,0x42, 0x00,0x00, 0x04,0x00,0x00,0x00, 0x4F, 0x5C, 0x42,0x00],
            // x22114435          DS                    8                    "1.2\2.3"
            [0x11,0x22,0x35,0x44, 0x4F,0x42, 0x00,0x00, 0x08,0x00,0x00,0x00, 0x31,0x2E,0x32, 0x5C, 0x32,0x2E,0x33,0x00],
            // x22114436          IS         2          "1.2\2.3"
            [0x11,0x22,0x36,0x44, 0x49,0x53, 0x04,0x00, 0x31,0x32,0x33,0x34],
            // x22114437          DA         8          "20140329"
            [0x11,0x22,0x37,0x44, 0x49,0x53, 0x08,0x00, 0x32,0x30,0x31,0x34,0x30,0x33,0x32,0x39],
            // x22114438          TM         14         "081236.531000"
            [0x11,0x22,0x38,0x44, 0x49,0x53, 0x0E,0x00, 0x30,0x38,0x31,0x32,0x33,0x36, 0x2E, 0x35,0x33,0x31,0x30,0x30,0x30, 0x00],
            // x22114439          PN         10         "F^G^M^P^S"
            [0x11,0x22,0x39,0x44, 0x50,0x4E, 0x0A,0x00, 0x46,0x5E,0x47,0x5E,0x4D,0x5E,0x50,0x5E,0x53,0x00]
        ];


        var arrayLength = 0;
        elements.forEach(function(element) {
            arrayLength += element.length;
        });

        var byteArray = new Uint8Array(arrayLength);
        var index = 0;
        elements.forEach(function(element) {
            for(var i=0; i < element.length; i++)
            {
                byteArray[index++] = element[i];
            }
        });

        return byteArray;
    }


    test("DataSet uint16", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var uint16 = dataSet.uint16('x22114433');

        // Assert
        equal(uint16, 0xadde, "uint16 returned wrong value");
    });

    test("DataSet uint32", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var uint32 = dataSet.uint32('x22114434');


        // Assert
        equal(uint32, 0x00425C4F, "uint32 returned wrong value");
    });

    test("DataSet numStringValues", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var numStringValues = dataSet.numStringValues('x22114434');

        // Assert
        equal(numStringValues, 2, "numStringValues returned wrong value");
    });

    test("DataSet string", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var str = dataSet.string('x22114434');

        // Assert
        equal(str, 'O\\B', "string returned wrong value");
    });

    test("DataSet string with index", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var str = dataSet.string('x22114434', 1);

        // Assert
        equal(str, 'B', "string returned wrong value");
    });

    test("DataSet floatString", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var float = dataSet.floatString('x22114435', 0);

        // Assert
        equal(float, 1.2, "floatString returned wrong value");
    });

    test("DataSet floatString no index", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var float = dataSet.floatString('x22114435');

        // Assert
        equal(float, 1.2, "floatString returned wrong value");
    });

    test("DataSet floatString", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var float = dataSet.floatString('x22114435', 0);

        // Assert
        equal(float, 1.2, "floatString returned wrong value");
    });
    test("DataSet floatString", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var float = dataSet.floatString('x22114435', 1);

        // Assert
        equal(float, 2.3, "floatString returned wrong value");
    });
    test("DataSet intString", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var val = dataSet.intString('x22114436');

        // Assert
        equal(val, 1234, "intString returned wrong value");
    });

    test("DataSet date", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var val = dataSet.date('x22114437');

        // Assert
        equal(val.getFullYear(), 2014, "date returned wrong value");
        equal(val.getMonth(), 2, "date returned wrong value");
        equal(val.getDate(), 29, "date returned wrong value");
    });


    test("DataSet time", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var val = dataSet.time('x22114438');

        // Assert
        equal(val.hours, 8, "time returned wrong value for hours");
        equal(val.minutes, 12, "time returned wrong value for minutes");
        equal(val.seconds, 36, "time returned wrong value for seconds");
        equal(val.fractionalSeconds, 531000, "time returned wrong value for fractionalSeconds");
    });

    test("DataSet personName", function() {
        // Arrange
        var byteArray = makeTestData();
        var byteStream = new dicomParser.LittleEndianByteStream(byteArray);
        var dataSet = dicomParser.parseDicomDataSetExplicit(byteStream);

        // Act
        var val = dataSet.personName('x22114439');

        // Assert
        equal(val.familyName, 'F', "personName returned wrong value for familyName");
        equal(val.givenName, 'G', "personName returned wrong value for givenName");
        equal(val.middleName, 'M', "personName returned wrong value for middleName");
        equal(val.prefix, 'P', "personName returned wrong value for prefix");
        equal(val.suffix, 'S', "personName returned wrong value for suffix");
    });


})(dicomParser);