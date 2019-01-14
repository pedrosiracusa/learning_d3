# D3 Best practices and visualization design considerations

#### Edward Tufte's design principles:
* Graphical integrity: Data skews caused by visualization (e.g. not starting axes from zero) should be avoided;
* The lie factor: Size of an effect shown in the graphic / size of the effect as measured in the actual data. This ratio should be the closest to 1 as possible;
* Chart junk: Elements in the screen that distract the viewer from the data (e.g. 3D, framing elements) should be avoided;
* Data-to-ink ratio: The ammount of charging the visualizations have. We should prefer the cleanest ones (high data/ink).

But those principles aren't necessarily strict rules. In some occasions we might add creativity at the cost of readability, in order to catch viewer attention.


#### Jacques Bertin's visual design space (J. Bertin, 'Semiology of Graphics', 1967)
Composed of design choices that we can make for visualizations: Position, size, texture, color, orientation and shapes.
Some visual channels are more effective for humans to interpret data. The most suitable channels also vary depending on the context and types of data.

Nice tool for selecting color schemes: [ColorBrewer](http://colorbrewer2.org)


# Dynamic and Interactive behavior

### Intervals for continuous loops 
We use intervals for running some code repeatedly every few seconds, changing the data being visualized.
The basic syntax is `d3.interval(foo(){}, interval)`, where `foo` is a callback function to run continuously; and `interval` is the delay (ms).

### Update function
Allows a dynamic visualization, where part of the code is constantly executing in an interval function. Everything outside the update function should be executed only once.


### Flag variables
We can use a flag variable to keep track of the data we're looking at.

The D3 Update Pattern
---------------------
This is one of the hardest parts of D3.

In data joins, D3 attaches 3 fields to variables created using the `selectAll()` method when passing an array of data with `data()`:
* **`_enter`** represents the elements that are in the data array but do not exist in the page. These are the shapes that must be entered onto the screen;
* **`_exit`** represents all the elements that are in the page but don't exist in the data array. These are the elements that must be removed from the screen;
* **`_groups`** represents all the elements that currently exist in the screen.

In D3 we always want to use the same update pattern:

1. We perform a **Data Join**. We use `selectAll()` to grab all SVGs and link them to an array of data, using the `.data()` method;
2. We **remove** all elements that should be removed from the page, using the `.exit()` selector and then removing those elements with `.remove()`;
3. We **set attributes** for existing elements on the screen as needed, using the `.attr()` method on the variable containing the data join;
4. Finally, we add **all new elements** in the data array which do not exist yet on the screen. We get all elements that should be added with the `.enter()` selector, and then we use the `.append()` method to add those to the screen. Then we can specify a set of attributes that should only be applied to those new items.




