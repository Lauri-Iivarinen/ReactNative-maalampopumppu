arr = []
print()
with open('text.txt') as text:
    for line in text:
        line = line.replace('\n', '')
        line = line.split(',')
        print("{" + f'name: "{line[1]}", code: "{line[0]}", valueType: "{line[2]}"' + "},")
