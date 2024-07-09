import re

classes = [
    '.headControl',
    '.c-header',
    '.headroom',
    '.headroom--top',
    '.headroom--not-bottom',
    '.language-translator',
    '.wrapper',
    '.c-header__secondary',
    '.c-header__list',
    '.c-header__item',
    '.menu-item',
    '.menu-item-type-custom',
    '.menu-item-object-custom',
    '.menu-item-4093',
    '.c-header__link',
    '.menu-item-1232',
    '.menu-item-4369',
    '.gtranslate_wrapper',
    '.gt_container--mvn65f',
    '.gt_selector',
    '.notranslate',
    '.select2-hidden-accessible',
    '.select2',
    '.select2-container',
    '.select2-container--default',
    '.selection',
    '.select2-selection',
    '.select2-selection--single',
    '.select2-selection__rendered',
    '.select2-selection__arrow',
    '.dropdown-wrapper',
    '.skiptranslate',
    '.goog-te-gadget',
    '.goog-te-combo',
    '.VIpgJd-ZVi9od-l4eHX-hSRGPd',
    '.o-row',
    '.c-header__primary',
    '.o-col-12',
    '.c-header__inner',
    '.c-header__logo',
    '.desktop',
    '.lightmode',
    '.mobile',
    '.darkmode',
    '.c-header__nav',
    '.includes-flyout',
    '.menu-item-4733',
    '.menu-item-has-children',
    '.menu-item-type-post_type',
    '.menu-item-object-page',
    '.c-header__submenu',
    '.c-header__flyout',
    '.small-flyout',
    '.canopy',
    '.menu-item-4734',
    '.horizon',
    '.menu-item-4735',
    '.menu-item-3974',
    '.case-studies',
    '.menu-item-3253',
    '.research',
    '.menu-item-3973',
    '.menu-item-418',
    '.menu-item-2715',
    '.menu-item-2716',
    '.c-hamburger-icon',
    '.c-hamburger-icon--slider',
    '.js-hamburger-icon',
    '.js-offcanvas-toggle',
    '.c-hamburger-icon__box',
    '.c-hamburger-icon__inner',
    '.c-offcanvas',
    '.is-active',
    '.c-offcanvas__inner',
    '.o-container',
    '.c-offcanvas__nav',
    '.c-offcanvas__list',
    '.c-offcanvas__item',
    '.c-offcanvas__link',
    '.flyout__inner',
    '.gt_container-voqqb9',
    '.gt-wrapper-78373858'
]


special = ['@media', '@supports', '@keyframes', '@font-face', '@import', '@charset', '@namespace', '@page']
elements = ['div', 'header', 'nav', 'ul', 'li', 'a', 'select', 'option', 'span', 'img', 'button', 'html', 'style', 'main']

def extract_css():

    filename = './topbar.css'
    fileoutSpecial = './special.css'
    fileoutElements = './elements.css'
    fileoutClasses = './classes.css'

    # look through the file and find any css features that match a list item, then write them to the appropriate file

    def extract_blocks(css_content, selectors, pureElement=False, pureSpecial=False, invert=False):
        blocks = []
        notblocks = []
        lines = css_content.splitlines()
        i = 0

        while i < len(lines):
            line = lines[i]
            invcheck = False
            for selector in selectors:
                if selector in line:
                    invcheck = True
                    if pureElement:
                        # Skip pure elements case
                        continue
                    block = line
                    depth = 0
                    if '{' in line:
                        depth += 1

                    i += 1
                    while i < len(lines):
                        line = lines[i]
                        block += '\n' + line
                        if '{' in line:
                            depth += 1
                        if '}' in line:
                            depth -= 1
                        if depth == 0:
                            break
                        i += 1

                    if pureSpecial:
                        inside_block = block.split('{', 1)[1].rsplit('}', 1)[0]
                        outside0 = block.split('{', 1)[0]
                        outside1 = block.rsplit('}', 1)[1]
                        block = outside0 + '{' + '\n\n'.join(extract_blocks(inside_block, selectors)[0]) + '}' + outside1
                    blocks.append(block)
                    break

            if invert and not invcheck:
                notblocks.append(line)

            i += 1

        return blocks, notblocks               
    
    with open(filename, 'r', encoding='utf-8') as file:
        css_content = file.read()

    special_blocks, nspec = extract_blocks(css_content, special)
    element_blocks, ne = extract_blocks(css_content, elements, pureElement=True)
    class_blocks, nc = extract_blocks(css_content, classes, invert=True)

    with open(fileoutSpecial, 'w', encoding='utf-8') as file:
        file.write('\n\n'.join(special_blocks))

    with open(fileoutElements, 'w', encoding='utf-8') as file:
        file.write('\n\n'.join(element_blocks))

    with open(fileoutClasses, 'w', encoding='utf-8') as file:
        file.write('\n\n'.join(class_blocks))

    with open('./notspecial.css', 'w', encoding='utf-8') as file:
        file.write('\n'.join(nspec))

    with open('./notelements.css', 'w', encoding='utf-8') as file:
        file.write('\n'.join(ne))

    with open('./notclasses.css', 'w', encoding='utf-8') as file:
        file.write('\n'.join(nc))


#extract_css()

def extract2css():
    filename = './topbar.css'

    # non destructive way to separate the css

    inBlock = False
    Outputs = ['Special', 'Elements', 'Classes', 'ClassesBad', 'Leftovers']
    currentOutput = Outputs[0]
    depth = 0

    with open(filename, 'r', encoding='utf-8') as file:
        with open('./o/special2.css', 'w', encoding='utf-8') as fileSpecial:
            with open('./o/elements2.css', 'w', encoding='utf-8') as fileElements:
                with open('./o/classes2.css', 'w', encoding='utf-8') as fileClasses:
                    with open('./o/notclasses2.css', 'w', encoding='utf-8') as fileNotClasses:
                        with open('./o/leftovers2.css', 'w', encoding='utf-8') as fileLeftovers:
                            for line in file:
                                # if in a block, write to the current output file
                                if inBlock:
                                    if '{' in line:
                                        depth += 1
                                    if '}' in line:
                                        depth -= 1
                                        if depth == 0:
                                            inBlock = False
                                    if currentOutput == Outputs[0]:
                                        fileSpecial.write(line)
                                    elif currentOutput == Outputs[1]:
                                        fileElements.write(line)
                                    elif currentOutput == Outputs[2]:
                                        fileClasses.write(line)
                                    elif currentOutput == Outputs[3]:
                                        fileNotClasses.write(line)
                                    else:
                                        fileLeftovers.write(line)

                                else:
                                    # try to find new block
                                    if line[0] == '@':
                                        # special
                                        inBlock = True
                                        currentOutput = Outputs[0]
                                        depth = 1
                                        fileSpecial.write(line)
                                    elif line[0] == '.':
                                        goodclass = False
                                        for c in classes:
                                            if c in line:
                                                goodclass = True
                                                break
                                        if goodclass:
                                            # class
                                            inBlock = True
                                            currentOutput = Outputs[2]
                                            depth = 1
                                            fileClasses.write(line)
                                        else:
                                            # bad class
                                            inBlock = True
                                            currentOutput = Outputs[3]
                                            depth = 1
                                            fileNotClasses.write(line)
                                    elif re.match(r'^[a-zA-Z]', line) and '.' not in line and '#' not in line:
                                        # element
                                        inBlock = True
                                        currentOutput = Outputs[1]
                                        depth = 1
                                        fileElements.write(line)
                                    else:
                                        # leftovers
                                        fileLeftovers.write(line)

#extract2css()
                                           
def check_file():
    

    losses = [
        '.headroom--top',
        '.headroom--not-bottom',
        '.menu-item-type-custom',
        '.menu-item-object-custom',
        '.menu-item-4093',
        '.menu-item-1232',
        '.menu-item-4369',
        '.gt_container--mvn65f',
        '.notranslate',
        '.select2-container--default',
        '.selection',
        '.dropdown-wrapper',
        '.skiptranslate',
        '.goog-te-gadget',
        '.goog-te-combo',
        '.VIpgJd-ZVi9od-l4eHX-hSRGPd',
        '.c-header__primary',
        '.menu-item-4733',
        '.menu-item-has-children',
        '.menu-item-type-post_type',
        '.menu-item-object-page',
        '.c-header__submenu',
        '.small-flyout',
        '.canopy',
        '.menu-item-4734',
        '.menu-item-4735',
        '.menu-item-3974',
        '.menu-item-3253',
        '.menu-item-3973',
        '.menu-item-418',
        '.menu-item-2715',
        '.menu-item-2716',
        '.js-hamburger-icon',
        '.js-offcanvas-toggle',
        '.gt_container-voqqb9',
        '.gt-wrapper-78373858',
        '.menu-item-4734',
        '.menu-item-4735',
        '.menu-item-3974',
        '.menu-item-3253',
        '.menu-item-3973',
        '.menu-item-418',
        '.menu-item-2715',
        '.menu-item-2716',
        '.js-hamburger-icon',
        '.js-offcanvas-toggle',
        '.gt_container-voqqb9',
        '.gt-wrapper-78373858'
    ]

    filename = './classes.css'

    with open(filename, 'r', encoding='utf-8') as file:
        css_content = file.read()

    for i in classes:
        if i not in css_content and i not in losses:
            print(i)

#check_file()

def html_classes_to_jsx():
    filename = './topbarM.jsx'

    with open(filename, 'r', encoding='utf-8') as file:
        with open('./topbarM2.jsx', 'w', encoding='utf-8') as file2:    
            for line in file:
                if 'className=' in line:
                    # match everything between className=" and the following "
                    classes = re.findall('className="([^"]+)"', line)

                    # replace className=" with className={styles.
                    # replace any spaces with , styles.
                    # replace closing " with }
                    newclasses = []
                    for c in classes:
                        for c2 in c.split(' '):
                            if '-' in c2:
                                newclasses.append('styles[\'' + c2 + '\']')
                            else:
                                newclasses.append('styles.' + c2)


                    classstring = ' + \' \' + '.join(newclasses)

                    print(line)
                    line = line.replace(re.search('className="([^"]+)"', line).group(0), 'className={' + classstring + '}')
                    
                file2.write(line)

#html_classes_to_jsx()

def fix_special():
    filename = './o/special2.css'

    # similiar to extractcss, but we want to delete unused classes inside the special blocks
    inSpecial = False
    inBlock = False
    Outputs = ['special', 'leftovers']
    currentOutput = Outputs[0]
    depth = 0
    p = False
    pv = 5

    with open('./css/special2.css', 'r', encoding='utf-8') as file:
        with open('./css/special3.css', 'w', encoding='utf-8') as fileSpecial:
            with open('./css/leftovers3.css', 'w', encoding='utf-8') as fileLeftovers:
                for line in file:
                    # propblem = '  dl {'
                    # if propblem in line:
                    #     print('problem', line)
                    #     p = True
                    # if p and pv > 0:
                    #     print('line', line)
                    #     pv -= 1
                    # if p and pv == 0:
                    #     raise Exception('problem')
                    # if in a special, do the inBlock
                    if inSpecial:
                        if inBlock:
                            if '{' in line:
                                depth += 1
                            if '}' in line:
                                depth -= 1
                                if depth == 0:
                                    inBlock = False
                            if currentOutput == Outputs[0]:
                                fileSpecial.write(line)
                            else:
                                fileLeftovers.write(line)

                        else:
                            # find good classes
                            goodclass = False
                            if not ';' in line:
                                for c in classes:
                                    if c in line:
                                        goodclass = True

                                for e in elements:
                                    if e in line:
                                        goodclass = True
                            
                            # if the first char (stripped) is a number, like 100%, we dont want to delete i
                            if re.match(r'^[0-9]', line.strip()):
                                goodclass = True

                            # if propblem in line:
                            #     print('problem is', goodclass)
                            if goodclass:
                                # class
                                inBlock = True
                                depth = 1
                                if p: 
                                    print('we are now adding sheeeeeeeee', line, goodclass)
                                fileSpecial.write(line)

                        if line == '}\n':
                            inSpecial = False
                            fileSpecial.write(line)

                    else:
                        # try to find next special
                        if line[0] == '@':
                            inSpecial = True
                            fileSpecial.write(line)
                        else:
                            fileLeftovers.write(line)

fix_special()