from random import randint

inputfile = open('data.tsv')
outputfile = open('data2.tsv', 'w')
outputfile.write(inputfile.readline())

i = 0
j= randint(0,100);
for line in inputfile:
	if (i%3) == 0:
		tab = line.index('\t')
		line = line[:tab + 1] + str(j) + '\n'
		outputfile.write(line)
		j = j + randint(-5,5)
	i = i+1

inputfile.close()
outputfile.close()