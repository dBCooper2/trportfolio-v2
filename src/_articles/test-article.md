# __Linear Regression in Python, from Scratch__

By: Trevor Rowland ([dBCooper2](https://github.com/dBCooper2))

Creating Linear Regression Models from Scratch.

| ![SLR_Model](link/to/img) | ![MLR_Model](link/to/img)|

--------------------------------------------------------

## Links to Files

Scripts containing each of the functions written in this notebook can be found at the following links

[OLS_Linear_Regression Class]()
[MLR_Class]()

## Table of Contents

1-2 [Simple Linear Regression](#1-2-simple-linear-regression)

.. 1. [The Theory](#1-the-theory)

.... a. [Introduction to Simple Linear Regression](#1a-introduction-to-simple-linear-regression)

.... b. [The Mean Squared Error](#1b-the-mean-squared-error)

.... c. [The Partial Derivatives of the Error Function](#1c-the-partial-derivatives-of-the-error-function)

.... d. [The Gradient Descent](#1d-the-gradient-descent)

.. 2. [Applying the Theory to Python](#2-applying-the-theory-to-python)

.... a. [The Gradient Descent Function in Python](#2a-the-gradient-descent-function-in-python)

.... b. [Performing Simple Linear Regression](#2b-performing-simple-linear-regression)

.... c. [Testing the Linear Regression Model](#2c-testing-the-linear-regression-model)

.... d. [Plotting the Regression Line](#2d-plotting-the-regression-line)

3-4 [Multiple Linear Regression](#3-4-multiple-linear-regression)

.. 3. [The Theory](#3-the-theory)

.... a. [The Model](#3a-the-model)

.... b. [The Error Function](#3b-the-error-function)

.... c. [Computing the Error Function for the MLR Model](#3c-computing-the-error-function-for-the-mlr-model)

.... d. [The Partial Derivative of the Error Function](#3d-the-partial-derivative-of-the-error-function)

.... e. [Interpreting the Theory to Translate into an Algorithm](#3e-interpreting-the-theory-to-translate-into-an-algorithm)

.. 4. [Applying the Theory to Python](#4-applying-the-theory-to-python)

.... a. [Function Definitions](#4a-function-definitions)

.... b. [Accessing the Data and Performing Multiple Linear Regression](#4b-accessing-the-data-and-performing-multiple-linear-regression)

...... i. [The 3-Factor Model](#4bi-the-3-factor-model)

...... ii. [The 3-Factor Model in Python](#4bii-the-3-factor-model-in-python)

...... iii. [The 5-Factor Model](#4biii-the-5-factor-model)

...... iv. [The 5-Factor Model in Python](#4biv-the-5-factor-model-in-python)

.... c. [Visualizing the Regression Results](#4c-visualizing-the-regression-results)

## 1-2. Simple Linear Regression

Regression Analysis is a tool used in statistics and finance to see how strongly related an dependent variable and one or more independent variables are.

The Simple Linear Regression model was made by following the Simple Linear Regression Tutorial by NeuralNine

### 1. _The Theory_

#### 1.a. Introduction to Simple Linear Regression

The Simple Linear Regression model uses an Ordinary Least Squares(OLS) approach to regression. The OLS model plots a line on a scatter plot, measures how far away it is from each point, then iteratively adjusts the slope and y-intercept in the linear equation to provide the line of best fit for the data.

_How does this happen?_

The Regression Model plots a line through all of the points in our dataset.

When the line is plotted, the points on the line will be different from the points in the dataset. The difference between the actual point and the point estimated by the line ($Y_i-\hat{Y_i}$) can be called an error.

The sum of those errors can be calculated to find the total error in the regression line.

Squaring those errors and dividing that sum of all squared errors by the number of y-values gives us a measure called the __Mean Squared Error__, or $MSE$:

$$
\begin{align*} MSE &= \frac{1}{n} \sum_{i=0}^{n}(Y_i - \hat{Y}_i)^2 \\

\hat{Y}_i &= mx_i+b

\end{align*}
$$

#### 1.b. The Mean Squared Error

__The Mean Squared Error describes what the average error is__, and to make the best-fit regression line, __that error must be minimized__.

Because the data cannot be modified, to develop the best-fit regression line the slope ($m$) and the y-intercept($b$) must be modified. This involves iterating over many different calculated values of $m$ and $b$, so how will the program know how to adjust the values across iterations?

The program will adjust the values by calculating the gradient descent of the Error($E$) with respect to $m$ and with respect to $b$. This can be done using partial derivatives of the Error function to find the fastest way to increase the Error because derivatives measure a rate of change. Here are the calculations to find those gradient descent functions:

$$
\begin{align*}
MSE = E(\hat{Y}_i) &= (\frac{1}{n}) \sum_{i=0}^{n}(Y_i - \hat{Y}_i)^2
\end{align*}
$$

Which decomposes into:

$$
\begin{align*}
MSE = E(m,b) &= (\frac{1}{n}) \sum_{i=0}^{n}(Y_i - (mx_i+b))^2
\end{align*}
$$

And to calculate the formulas for the optimization of the regression line that will be performed later, the formula can be fully expanded into:

$$
\begin{align*}
E(m,b) &= (\frac{1}{n}) \sum_{i=0}^{n}(Y_i^2 -2Y_imx_i-2Y_ib+m^2x_i^2+2mx_ib+b^2)
\end{align*}
$$

Now that the fully expanded Error Function has been found, the gradient descent formulas to optimize the regression line can be computed.

#### 1.c. The Partial Derivatives of the Error Function

Taking the Partial Derivative of $E(m,b)$ with respect to $m$:

$$
\begin{align*}

(\frac{\partial}{\partial m})E(m,b) &= (\frac{\partial}{\partial m})(\frac{1}{n}) \sum_{i=0}^{n}(Y_i^2 -2Y_imx_i-2Y_ib+m^2x_i^2+2mx_ib+b^2) \\

\frac{\partial E}{\partial m} &= (\frac{1}{n}) \sum_{i=0}^{n}( -2Y_ix_i+2mx_i^2+2x_ib) \\

\frac{\partial E}{\partial m} &= (\frac{-2}{n}) \sum_{i=0}^{n}(Y_ix_i-mx_i^2-x_ib) \\

\frac{\partial E}{\partial m} &= (\frac{-2}{n}) \sum_{i=0}^{n}x_i(Y_i-mx_i-b) \\

\frac{\partial E}{\partial m} &= (\frac{-2}{n}) \sum_{i=0}^{n}[x_i(Y_i-(mx_i+b))]

\end{align*}
$$

Taking the Partial Derivative of $E(m,b)$ with respect to $b$:

$$
\begin{align*}
(\frac{\partial}{\partial b})E(m,b) &= (\frac{\partial}{\partial b})(\frac{1}{n}) \sum_{i=0}^{n}(Y_i^2 -2Y_imx_i-2Y_ib+m^2x_i^2+2mx_ib+b^2) \\

\frac{\partial E}{\partial b} &= (\frac{1}{n}) \sum_{i=0}^{n}(-2Y_i+2mx_i+2b) \\

\frac{\partial E}{\partial b} &= (\frac{-2}{n}) \sum_{i=0}^{n}(Y_i-mx_i-b) \\

\frac{\partial E}{\partial b} &= (\frac{-2}{n}) \sum_{i=0}^{n}(Y_i-(mx_i+b))

\end{align*}
$$

After these calculations, the partial derivatives of the error function are as follows:

$$
\begin{align*}
\frac{\partial E}{\partial m} &= (\frac{-2}{n}) \sum_{i=0}^{n}[x_i(Y_i-(mx_i+b))] \\

\frac{\partial E}{\partial b} &= (\frac{-2}{n}) \sum_{i=0}^{n}(Y_i-(mx_i+b))
\end{align*}
$$


## _References_

### Simple Linear Regression

NeuralNine. "Linear Regression from Scratch in Python." NeuralNine, NeuralNine, <https://www.neuralnine.com/linear-regression-from-scratch-in-python/>

### Multiple Linear Regression

[Dash, Debidutta](https://dddash11.medium.com/). "Multiple Linear Regression from scratch using only numpy." Medium, 2022, <https://medium.com/analytics-vidhya/multiple-linear-regression-from-scratch-using-only-numpy-98fc010a1926>.

[Ramesh, Bhanumathi](https://medium.com/@bhanu0925). "Deriving Normal Equation for Multiple Linear Regression." Medium, 2022, <https://medium.com/@bhanu0925/deriving-normal-equation-for-multiple-linear-regression-85241965ee3b>.

[LearnChemE](https://www.youtube.com/@LearnChemE). "Matrix Approach to Multiple Linear Regression." YouTube, uploaded by LearnChemE, 2022, <https://youtu.be/NzuK4iAfxhU?si=cxU-v8ZBgbA1s-FG>.

[Boer Commander](https://www.youtube.com/@BoerCommander). "Matrix Form Multiple Linear Regression MLR." YouTube, uploaded by Boer Commander, 2022, <https://youtu.be/Imjfp1cxy6g?si=gWXnA9F_XisVzFA4>.

French, Kenneth R. "Data Library." Kenneth R. French - Data Library, Tuck School of Business at Dartmouth, <https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html>.
