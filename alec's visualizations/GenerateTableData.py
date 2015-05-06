from random import randint, choice
outputfile = open('table_data.csv', 'w')
outputfile.write('district,subdistrict,difference,updated\n')

districts = ['Barguna','Barisal','Bhola','Jhalokati','Patuakhali','Pirojpur','Bandarban','Brahmanbaria','Chandpur','Chittagong','Comilla','Cox\'s Bazar','Feni','Khagrachhari','Lakshmipur','Noakhali','Rangamati','Dhaka','Faridpur','Gazipur','Gopalganj','Jamalpur','Kishoreganj','Madaripur','Manikganj','Munshiganj','Mymensingh','Narayanganj','Narsingdi','Netrakona','Rajbari','Shariatpur','Sherpur','Tangail','Bagerhat','Chuadanga','Jessore','Jhenaidah','Khulna','Kushtia','Magura','Meherpur','Narail','Satkhira','Bogra','Joypurhat','Naogaon','Natore','Chapainawabganj','Pabna','Rajshahi','Sirajganj','Dinajpur','Gaibandha','Kurigram','Lalmonirhat','Nilphamari','Panchagarh','Rangpur','Thakurgaon','Habiganj','Moulvibazar','Sunamganj','Sylhet']
for i in range(20):
	outputfile.write(choice(districts) + ',' + choice(districts) + ',' + str(randint(0,100)) + '%,' + str(randint(1,7)) + ' days ago\n')
outputfile.close()