
import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';

const Calculator = () => {
  const [calculatorType, setCalculatorType] = useState('broker');
  
  // 중개보수 계산기 상태
  const [propertyPrice, setPropertyPrice] = useState('');
  const [brokerFee, setBrokerFee] = useState('');
  
  // 대출이자 계산기 상태
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  
  // 일반 계산기 상태
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // 중개보수 계산 함수
  const calculateBrokerFee = () => {
    const price = parseFloat(propertyPrice.replace(/,/g, ''));
    if (isNaN(price)) {
      setBrokerFee('유효한 금액을 입력하세요');
      return;
    }
    
    let fee = 0;
    // 중개보수 계산 로직 (예시)
    if (price <= 50000000) {
      fee = price * 0.006; // 0.6%
    } else if (price <= 200000000) {
      fee = price * 0.005; // 0.5%
    } else if (price <= 600000000) {
      fee = price * 0.004; // 0.4%
    } else if (price <= 900000000) {
      fee = price * 0.003; // 0.3%
    } else {
      fee = price * 0.002; // 0.2%
    }
    
    // 최대 상한액 적용
    if (price <= 50000000 && fee > 250000) {
      fee = 250000;
    } else if (price <= 200000000 && fee > 800000) {
      fee = 800000;
    }
    
    setBrokerFee(fee.toLocaleString() + '원');
  };

  // 대출이자 계산 함수
  const calculateLoanPayment = () => {
    const principal = parseFloat(loanAmount.replace(/,/g, ''));
    const rate = parseFloat(interestRate) / 100 / 12;
    const term = parseFloat(loanTerm) * 12;
    
    if (isNaN(principal) || isNaN(rate) || isNaN(term)) {
      setMonthlyPayment('유효한 값을 입력하세요');
      return;
    }
    
    const payment = principal * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
    setMonthlyPayment(payment.toLocaleString() + '원');
  };
  
  // 일반 계산기 함수
  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);
    
    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }
    
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const resetCalculator = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return;
    }
    
    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);
    
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  // 계산기 유형 전환 함수
  const switchCalculator = () => {
    if (calculatorType === 'broker') {
      setCalculatorType('loan');
    } else if (calculatorType === 'loan') {
      setCalculatorType('regular');
    } else {
      setCalculatorType('broker');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold text-center mb-8">부동산 계산기</h1>
          
          <Tabs value={calculatorType} onValueChange={setCalculatorType} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="broker">중개보수 계산기</TabsTrigger>
              <TabsTrigger value="loan">대출이자 계산기</TabsTrigger>
              <TabsTrigger value="regular">일반 계산기</TabsTrigger>
            </TabsList>
            
            {/* 중개보수 계산기 */}
            <TabsContent value="broker">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">중개보수 계산기</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      부동산 매매가 (원)
                    </label>
                    <Input
                      value={propertyPrice}
                      onChange={(e) => setPropertyPrice(e.target.value)}
                      placeholder="매매가를 입력하세요"
                      className="w-full"
                    />
                  </div>
                  
                  <Button onClick={calculateBrokerFee} className="w-full">
                    계산하기
                  </Button>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">중개보수 금액</p>
                    <p className="text-2xl font-bold text-blue-600">{brokerFee || '0원'}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      * 계산된 금액은 법정 중개보수 요율에 따라 산출되었습니다.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* 대출이자 계산기 */}
            <TabsContent value="loan">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-6">대출이자 계산기</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      대출 금액 (원)
                    </label>
                    <Input
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="대출 금액을 입력하세요"
                      className="w-full"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        연 이자율 (%)
                      </label>
                      <Input
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="이자율을 입력하세요"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        대출 기간 (년)
                      </label>
                      <Input
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                        placeholder="대출 기간을 입력하세요"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateLoanPayment} className="w-full">
                    계산하기
                  </Button>
                  
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-600">월 상환금액</p>
                    <p className="text-2xl font-bold text-blue-600">{monthlyPayment || '0원'}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      * 계산된 금액은 원리금 균등상환 방식을 기준으로 합니다.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* 일반 계산기 */}
            <TabsContent value="regular">
              <div className="calculator-container mx-auto">
                <div className="calculator-display">
                  {display}
                </div>
                <div className="calculator-buttons">
                  <button className="calc-button clear" onClick={resetCalculator}>C</button>
                  <button className="calc-button operation" onClick={() => handleOperator('/')}>/</button>
                  <button className="calc-button operation" onClick={() => handleOperator('*')}>×</button>
                  <button className="calc-button operation" onClick={() => handleOperator('-')}>-</button>
                  
                  <button className="calc-button number" onClick={() => inputDigit('7')}>7</button>
                  <button className="calc-button number" onClick={() => inputDigit('8')}>8</button>
                  <button className="calc-button number" onClick={() => inputDigit('9')}>9</button>
                  <button className="calc-button operation" onClick={() => handleOperator('+')}>+</button>
                  
                  <button className="calc-button number" onClick={() => inputDigit('4')}>4</button>
                  <button className="calc-button number" onClick={() => inputDigit('5')}>5</button>
                  <button className="calc-button number" onClick={() => inputDigit('6')}>6</button>
                  <button className="calc-button equals" onClick={handleEquals}>=</button>
                  
                  <button className="calc-button number" onClick={() => inputDigit('1')}>1</button>
                  <button className="calc-button number" onClick={() => inputDigit('2')}>2</button>
                  <button className="calc-button number" onClick={() => inputDigit('3')}>3</button>
                  <button className="calc-button number" onClick={() => inputDigit('0')}>0</button>
                  
                  <button className="calc-button number" onClick={inputDecimal}>.</button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* 화살표 버튼 - 계산기 전환 */}
          <div className="flex justify-end mt-6">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={switchCalculator}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
