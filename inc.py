with open('src/version.txt') as f:
    version = int(f.read())
version += 1
with open('src/version.txt', 'w') as f:
    f.write(str(version))
