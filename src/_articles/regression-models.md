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

These Partial Derivatives are now ready to be plugged into the Gradient Descent.

#### 1.d. The Gradient Descent

The gradient descent is an optimization technique that seeks to locate a minimum value for each coefficient of the regression line. A good way to think about Gradient Descent is to visualize someone hiking down a mountain. Every 5 or so steps, the hiker must look at their surroundings and determine what the steepest path down is, and then take that path. After they have gone another 5 steps, the hiker checks their surroundings again, determines the steepest path down, and uses that process until they reach the ground.

In this example, those 5 steps the hiker takes can be called the __Learning Rate__ in the gradient descent process. This is a coefficient for the partial derivatives that controls how much the model will try to fit the line to the data. The closer the learning rate is to 0, the more precise the model should be.

*Note: This can lead to the model being "overfitted", so an optimized version of the learning rate should also be found through testing.*

The gradient descent function is calculated by iteratively subtracting the partial derivative from the current value of $m$ or $b$, respectively, so our equations for the learning rate look like this:

$$
\begin{align*}
m_{new} &= m_{current} - \frac{\partial E}{\partial m} \\
b_{new} &= m_{current} - \frac{\partial E}{\partial b}
\end{align*}
$$

Where $0 < L < 1$.

Now that the Math for the functions have been worked out, the python code to create the simple linear regression model is ready to be written. [Rewrite this]

### 2. Applying the Theory to Python

#### 2.a. The Gradient Descent Function in Python

Short description about the gradient descent

```python
def gradient_descent(m_current, b_current, df, learning_rate):
    m_gradient = 0
    b_gradient = 0

    n = len(df) # The number of rows in the dataset

    # Calculate the partial derivative summations
    for i in range(n):
        x = df.iloc[i].x
        y = df.iloc[i].y

        # These are a pythonic representation of partial derivative equations found in the theory section
        m_gradient += (-2/n) * x * (y - (m_current * x + b_current))
        b_gradient += (-2/n) * (y - (m_current * x + b_current))

    # Calculate the Gradient Descent equations from the theory section
    m = m_current - learning_rate * m_gradient
    b = b_current - learning_rate * b_gradient

    return m,b
```

#### 2.b. Performing Simple Linear Regression

Now that the gradient descent function is complete, a function to iteratively call that function is needed to minimize the error of the regression line

```python
def ols_regression(learning_rate, iterations, df):
    m = 0
    b = 0

    for i in range(iterations):
        m,b = gradient_descent(m, b, df, learning_rate)

    return m,b
```

#### 2.c. Testing the Linear Regression Model

To apply the OLS linear regression functions, the program will take a dataset and perform the regression on it. The [dataset](https://www.kaggle.com/datasets/luddarell/101-simple-linear-regressioncsv?resource=download) being used is just a simple CSV file by [luddarell](https://www.kaggle.com/luddarell) from [kaggle](https://www.kaggle.com/).

```python
import pandas as pd

# Import the Data
file = '/path/to/repos/github/portfolio-backtesting/docs/data/1.01_Simple_linear_regression.csv'

df = pd.read_csv(file)
df2 = pd.DataFrame()

df2['y'] = df['SAT']
df2['x'] = df['GPA']

df = df2
```

Finally, set the learning rate and number of iterations, then call the linear regression function:

```python
# Run the Regression Model:
learning_rate = .001
iterations = 10000
m,b = ols_regression(learning_rate, iterations, df)
print(m,b)
```

```python
477.47759913775326 250.49383109375495
```

#### 2.d. Plotting the Regression Line

Now that the regression line has been computed, the line should be visualized to gain a better understanding of what the data analysis performed looks like.

```python
import seaborn as sns

sns.regplot(x ='x', y='y',data=df)
```

From this plot, the line's fit of the data can be clearly seen and the variance is shown with the shadows around the line.

## 3-4. Multiple Linear Regression

### 3. The Theory

Regression models take a series of predictor(X) variables and a single response(Y) variable, and estimates a line of best fit that can be used to predict unknown response variables.

This regression model can be applied to any series of predictor and response variables, however for the purpose of the [pythonic-finance project](https://github.com/dBCooper2/pythonic-finance), this model will be used in the Fama-French 3 and 5 factor analyses of portfolios, which will have a brief overview in the python section, where the beta coefficients for this model will be calculated.

#### 3.a. _The Model_

The Multiple Linear Regression Model is:

$$
\begin{align*}
y = \beta_0 + \beta_1x_1+\beta_2x_2+...+\beta_px_p + \epsilon_i
\end{align*}
$$

Which can be translated into the Matrix Form:

$$
\begin{align*}
Y_i &=

\begin{bmatrix}
\beta_0 & \beta_1 & ... & \beta_p
\end{bmatrix}

\begin{bmatrix}
X_0 \\
X_1 \\
... \\
X_p \\
\end{bmatrix}

, X_0 = 1
\end{align*}
$$

Setting $X_0 = 1$ allows the matrices to be the same size, which simplifies the calculations by including the Y-intercept Beta($\beta_0$) in the coefficient matrix.

#### 3.b. _The Error Function_

The error function that will be minimized in the model is the Sum of Squared Errors, which measures variation within a cluster of data.

The Formula for the Sum Squared Errors($SSE$) is:

$$
\begin{align*}
E = SSE &= \sum_{i=1}^{n} \epsilon_i^2 \\
&= \sum_{i=1}^{n}(y_i-\hat{y_i})^2
\end{align*}
$$

This is a sum of each of the squared differences between the observed response variable $y_i$ and the estimated response variable $\hat{y_i}$.

The Matrix form of the SSE formula is:

$$
\begin{align*}
E = SSE &= \sum_{i=1}^{n} \epsilon_i^2 \\
& = \mathcal{E}^T\mathcal{E}
\end{align*}
$$

Instead of squaring the matrices, the error matrix is multiplied by its transpose. This is done because the errors are an $n{\times}1$ matrix, and computing $\epsilon_i^2$ is not possible, so the transpose is used instead.

An expansion of this equation using vectors is provided below:

$$
\begin{align*}

E &=\sum_{i=1}^{n}&
\begin{bmatrix}
y_1 - \hat{y_1}&
y_2 - \hat{y_2}&  
... &  
y_n - \hat{y_n}
\end{bmatrix}

\begin{bmatrix}
y_1 - \hat{y_1}\\
y_2 - \hat{y_2}\\
\vdots \\
y_n - \hat{y_n}
\end{bmatrix}

\end{align*}
$$

#### 3.c. _Computing the Error Function for the MLR Model_

In Linear Algebra, the transpose of a sum can be decomposed in the following ways:

$$
\begin{align*}
(A+B)^T &= A^T+B^T \\
(A-B)^T &= A^T-B^T
\end{align*}
$$

Which means the transpose operator in $E = \hat{\mathcal{E}}^T\hat{\mathcal{E}}$ can be distributed, making the function:

$$
\begin{align*}
E &= \sum_{i=1}^{n}(Y^T-\hat{Y}^T)(Y-\hat{Y})
\end{align*}
$$

Substituting the matrix form $\hat{Y} = X \beta$ into the error function returns:

$$
\begin{align*}
E &= \sum_{i=1}^{n}(Y^T-(X \beta)^T)(Y-(X \beta)) \\
E &= \sum_{i=1}^{n}[Y^T Y - Y^T X \beta - Y(X \beta)^T + (X \beta)^T (X \beta)]
\end{align*}
$$

In order to finish simplifying the equations, the following terms must be proven equal in order to simplify into the solution $\hat{\beta} = (X^T X^{-1})(X^T Y)$:

$$
\begin{align*}
(X \beta)^T Y = Y^T (X \beta)
\end{align*}
$$

Let $Y = A, X \beta=B$:

Therefore the equation $(X \beta)^T Y = Y^T (X \beta)$ becomes $A^T B = B^T A$

$$
\begin{align*}
(AB)^T = B^T A^T,& (A+B)^T = A^T + B^T \\
(A^T B)^T = B^T A,& (A-B)^T = A^T - B^T
\end{align*}
$$

Therefore

$$
\begin{align*}
A^T B = B^T A &= (A^T B)^T \\
Y^T (X \beta)  &= (Y^T (X \beta))^T
\end{align*}
$$

Substituting this back into the $SSE$ equation allows it to be simplified.

$$
\begin{align*}
E &= \sum_{i=1}^{n} Y^T Y - Y^T X \beta - Y(X \beta)^T + (X \beta)^T (X \beta) \\
E &= \sum_{i=1}^{n} Y^T Y - 2Y^T X \beta + (X \beta)^T (X \beta)
\end{align*}
$$

#### 3.d. _The Partial Derivative of the Error Function_

Now that the error function is expanded to include the equation of the MLR Model, the partial derivative of the error function can be computed.

The partial derivative is used to compute how much the error within the model is changing, and is iteratively calculated to minimize each coefficient $\beta$. It is important to note that this partial derivative is merely an estimate, as the data is a series of discrete observations and not continuous.

The vector of the minimized values of each $\beta$ are labeled $\hat{\beta}$ in the _Normal Equations_, which are the results of the minimization process.

$$
\begin{align*}
\frac{\partial E}{\partial \beta} &= \frac{\partial}{\partial \beta} ( \sum_{i=1}^{n} Y^T Y - 2Y^T X \beta + (X \beta)^T (X \beta)) \\
\frac{\partial E}{\partial \beta} &= \sum_{i=1}^{n} 0 - 2Y^T X + 2X^T \beta^T X
\end{align*}
$$

Then setting the partial derivative equal to 0 and solving for $\hat{\beta}$, the equation becomes:

$$
\begin{align*}
0 &= 0 - 2Y^T X + X^T \hat{\beta}^T X \\
2Y^T X &= X^T \hat{\beta}^T X \\
\hat{\beta}^T &= \frac{2Y^T X}{2X^T X}  = (Y^T X)(X^T X)^{-1} \\
\hat{\beta} &= [(Y^T X)(X^T X)^{-1}]^T \\
\hat{\beta} &= (Y^T X)^T [(X^T X)^{-1}]^T \\
\hat{\beta} &= (X^T Y) (X^T X)^{-1}
\end{align*}
$$

Lastly, the Normal Equations can be found by rearranging the equation:

$$
\begin{align*}
X^TX\hat{\beta} &= X^T Y
\end{align*}
$$

#### 3.e. _Interpreting the Theory to Translate into an Algorithm_

$\hat{\beta}$ is the _Least Squares Estimator_ for the model. This means that it is a coefficient matrix that can take the observed $x$ and $y$ values and estimate a value for each $\beta$ in the model.

In the Simple Linear Regression Model, the Formula for the Gradient Descent of the slope was:

$$
\begin{align*}
m_{new} &= m_{current} - \frac{\partial E}{\partial m}
\end{align*}
$$

The Normal Equations bypass this iterative gradient descent process, and perform the gradient descent in one step. By plugging the dataset into the Normal Equations formula for $\hat{\beta}$, the optimal $\beta$ coefficients for each predictor variable are computed without needing iteration like in the Simple Linear Regression Model.

### 4. Applying the Theory to Python

The necessary packages for this section are NumPy, Pandas, YFinance, MatPlotLib and Seaborn.

The CSV Data for the 3 and 5 Factor Models can be found in [Dr. Kenneth French's Data Library](https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html) and will be downloaded and added to a CSV file in another Python Script to reduce the complexity of this notebook. The CSV files with the combined datasets will be available [here](https://github.com/dBCooper2/pythonic-finance/tree/main/notebooks/regression_models/multiple_linear_regression_files).


```python
import numpy as np
import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt
```

#### 4.a. Function Definitions

Because the Normal Equations solve for the gradient descent in one step, the Multiple Linear Regression function needs to take a DataFrame and convert it into the necessary NumPy arrays, then compute each part of the Normal Equations to solve for $\hat{\beta}$. Recall that the formula for the vector $\hat{\beta}$ is:

$$
\begin{align*}
\hat{\beta} &= (X^T Y) (X^T X)^{-1}
\end{align*}
$$

```python
def multiple_linear_regression(df:pd.DataFrame)->pd.DataFrame:
    x = df.filter(like='x_').values
    y = df.filter(like='y_').values

    xT = x.T
    xTx = np.dot(xT, x)
    xTx_inv = np.linalg.inv(xTx)

    xTy = np.dot(xT,y)

    betas = np.dot(xTx_inv, xTy)

    return betas
```

#### 4.b. Accessing the Data and Performing Multiple Linear Regression

The Data was written to a CSV file using the Script 'dataset_creator.py' in the /notebooks/regression_models/multiple_linear_regression_files/ directory in the project. This CSV contains the Fama-French Library Data, as well as the Stock returns for AMD.


```python
ff_3_df = pd.read_csv('/path/to/repos/github/pythonic-finance/notebooks/regression_models/multiple_linear_regression_files/ff_3_factor.csv')
ff_5_df = pd.read_csv('/path/to/repos/github/pythonic-finance/notebooks/regression_models/multiple_linear_regression_files/ff_5_factor.csv')
```

Now that the data has been accessed, the Multiple Linear Regression can be run on each dataset:

##### 4.b.i. _The 3-Factor Model_

The Fama-French 3 Factor Model is an extension of the Capital Asset Pricing Model, aiming to describe a stock or portfolio's returns through market risk as well as the outperformance of small-cap companies relative to large-cap companies and the outperformance of high market-to-book value companies relative to low market-to-book value companies.

The model suggests that both small-cap stocks and stocks with a high market-to-book ratio tend to regularly outperform the overall market, and thus should be factored into the model.

This data can be found in [Dr. Kenneth French's](https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html) data library and will be used for this model.

The formula for the 3-factor model is:

$$
\begin{align*}
R_i-R_{rf} &= \alpha + \beta_1(R_{rf}-R_m) + \beta_2(SMB) + \beta_3(HML) + \epsilon_i
\end{align*}
$$

Where:

$R_i$ is the expected rate of return

$R_{rf}$ is the risk-free rate

$SMB$ = _Small Minus Big_, the historic excess returns of small-caps over large-caps

$HML$ = _High Minus Low_, the historic excess returns of high market-to-book ratio companies over low market-to-book ratio companies

$\beta_{1,2,3}$ are the coefficients of each factor, estimated by the regression model

$\alpha$ is the excess return on investment

$\epsilon_i$ is the noise within the model

##### 4.b.ii. _The 3-Factor Model in Python_

```python
betas_3_factor = pd.DataFrame(multiple_linear_regression(ff_3_df)).T

new_cols = {0:'alpha', 1:'mkt-rf', 2:'smb', 3:'hml'}
betas_3_factor.rename(columns=new_cols, inplace=True)

betas_3_factor
```

|alpha|mkt-rf|smb|hml|
|-----|------|---|---|
|0.117517|1.520856|0.104164|-0.78295|

***

##### 4.b.iii. _The 5-Factor Model_

The Fama-French 5-Factor model is another iteration of the 3-Factor Model, including 2 new factors. These are:

- $RMW$ = _Robust Minus Weak_, the average return on two robust operating-profitability portfolios minus the average return on two weak operating-profitability portfolios.

- $CMA$ = _Conservative Minus Aggressive_, the average return on two conservative investment portfolios minus the average return on two aggressive investment portfolios.

These Factors are also found in [Dr. Kenneth French's](https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html) data library, and will be used for this model.

The formula for the 5-Factor Model is:

$$
\begin{align*}
R_i-R_{rf} &= \alpha + \beta_1(R_{rf}-R_m) + \beta_2(SMB) + \beta_3(HML) + \beta_4(RMW) + \beta_5(CMA) + \epsilon_i
\end{align*}
$$

##### 4.b.iv. _The 5-Factor Model in Python_

```python
betas_5_factor = pd.DataFrame(multiple_linear_regression(ff_5_df)).T

new_cols = {0:'alpha', 1:'mkt-rf', 2:'smb', 3:'hml', 4:'rmw', 5:'cma'}
betas_5_factor.rename(columns=new_cols, inplace=True)

betas_5_factor
```

Doing this returns the following values:

|alpha|mkt-rf|smb|hml|rmw|cma|
|-----|------|---|---|---|---|
|0.127646|1.467586|-0.067626|-0.557057|-0.151023|-0.574484|

***

#### 4.c. Visualizing the Regression Results

Now that the Regression Results have been computed for both the 3 and 5 factor models, some visualizations are needed to examine what the results look like. Currently, I am trying to put these notebooks together for a school project, so the results are not yet finished. This will be updated later, but for now I need to get these posts done. Check back soon!

_______________

The Functions used in this Notebook will be translated into Python Classes within the [scripts](https://github.com/dBCooper2/pythonic-finance/tree/main/scripts) folder of this project. The last part of this project involves generating ANOVA Tables for each model, and then the OOP implementations will begin to be added. If the programs are not here when you are reading this, they will be soon so check back later : )

## _References_

### Simple Linear Regression

NeuralNine. "Linear Regression from Scratch in Python." NeuralNine, NeuralNine, <https://www.neuralnine.com/linear-regression-from-scratch-in-python/>

### Multiple Linear Regression

[Dash, Debidutta](https://dddash11.medium.com/). "Multiple Linear Regression from scratch using only numpy." Medium, 2022, <https://medium.com/analytics-vidhya/multiple-linear-regression-from-scratch-using-only-numpy-98fc010a1926>.

[Ramesh, Bhanumathi](https://medium.com/@bhanu0925). "Deriving Normal Equation for Multiple Linear Regression." Medium, 2022, <https://medium.com/@bhanu0925/deriving-normal-equation-for-multiple-linear-regression-85241965ee3b>.

[LearnChemE](https://www.youtube.com/@LearnChemE). "Matrix Approach to Multiple Linear Regression." YouTube, uploaded by LearnChemE, 2022, <https://youtu.be/NzuK4iAfxhU?si=cxU-v8ZBgbA1s-FG>.

[Boer Commander](https://www.youtube.com/@BoerCommander). "Matrix Form Multiple Linear Regression MLR." YouTube, uploaded by Boer Commander, 2022, <https://youtu.be/Imjfp1cxy6g?si=gWXnA9F_XisVzFA4>.

French, Kenneth R. "Data Library." Kenneth R. French - Data Library, Tuck School of Business at Dartmouth, <https://mba.tuck.dartmouth.edu/pages/faculty/ken.french/data_library.html>.
